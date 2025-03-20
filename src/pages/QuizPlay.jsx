import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getQuizById, playQuiz } from "../api"; // Importation de playQuiz
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const QuizPlay = () => {
  const { token, user_id } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (token) {
      getQuizById(id, token)
        .then((data) => {
          setQuizData(data);
          setTimeLeft(data.timeLimit * 60);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement du quiz", error);
        });
    }
  }, [id, token]);

  useEffect(() => {
    if (timeLeft > 0 && quizData) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && quizData) {
      alert("Le temps est écoulé !");
      handleQuizEnd();
    }
  }, [timeLeft, quizData]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData.data.questions[currentQuestionIndex].reponse) {
      setScore((prevScore) => prevScore + 10);
    }
    if (currentQuestionIndex + 1 < quizData.data.questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizEnd();
    }
  };

  const handleQuizEnd = async () => {
    setIsFinished(true);

    const partieData = {
      quiz: id,
      player: user_id,
      score: score,
    };
console.log(partieData);

    try {
      await playQuiz(partieData, token);
      alert("Résultat enregistré avec succès !");
    } catch (error) {
      alert("Erreur lors de l'enregistrement du résultat.");
    }

    navigate("/playerquizresults");
  };

  if (!quizData) return <div className="text-blue-500 text-center min-h-screen">Chargement...</div>;

  const quizDatas = quizData.data;
  console.log(quizData);
  

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-4">{quizDatas.categorie} - {quizDatas.niveau}</h1>
      <p className="text-center text-gray-600 mb-8">
        Temps restant: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      {!isFinished ? (
        currentQuestionIndex < quizDatas.questions.length ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {quizDatas.questions[currentQuestionIndex].question}
            </h3>

            <div className="space-y-4">
              {quizDatas.questions[currentQuestionIndex].autres.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-3 border rounded-lg text-left ${selectedAnswer === option ? "bg-blue-200" : "hover:bg-gray-100"}`}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                  
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
              >
                Suivant
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Quiz terminé !</h2>
            <p>Votre score est de {score} sur {quizDatas.questions?.length * 10}</p>
          </div>
        )
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Résultat enregistré !</h2>
          <p>Votre score est de {score} sur {quizDatas.questions?.length * 10}</p>
          <Link to="/playerquizresults">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition mt-4">
              Voir les résultats
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};  

export default QuizPlay;
