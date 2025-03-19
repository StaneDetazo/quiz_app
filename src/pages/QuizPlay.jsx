import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const QuizPlay = () => {
  const { quizId } = useParams();  // Récupérer l'ID du quiz depuis l'URL
  const navigate = useNavigate();

  // Données statiques pour le quiz
  const quizData = {
    id: 1,
    category: "Science",
    level: "Facile",
    totalScore: 50,
    timeLimit: 10,  // Temps en minutes
    questions: [
      {
        question: "Quelle est la planète la plus proche du soleil ?",
        options: ["Terre", "Vénus", "Mercure", "Mars"],
        correctAnswer: "Mercure",
      },
      {
        question: "Qui a écrit 'Roméo et Juliette' ?",
        options: ["Shakespeare", "Hemingway", "Austen", "Dickens"],
        correctAnswer: "Shakespeare",
      },
      // Ajouter plus de questions si nécessaire
    ],
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60);  // Convertir le temps en secondes
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Décompte du temps
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      // Fin du temps
      alert("Le temps est écoulé !");
      navigate("/quiz-results"); // Redirige vers la page des résultats du quiz
    }
  }, [timeLeft, navigate]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 10);  // Chaque question vaut 10 points
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">{quizData.category} - {quizData.level}</h1>
      <p className="text-center text-gray-600 mb-8">
        Temps restant: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
      </p>

      {/* Affichage des questions */}
      {currentQuestionIndex < quizData.questions.length ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            {quizData.questions[currentQuestionIndex].question}
          </h3>

          <div className="space-y-4">
            {quizData.questions[currentQuestionIndex].options.map((option, index) => (
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
        // Lorsque toutes les questions sont répondues
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Quiz terminé !</h2>
          <p>Votre score est de {score} sur {quizData.totalScore}</p>
          {/* <Link to="/quizresults">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition mt-4">
              Voir les résultats
            </button>
          </Link> */}
          <Link to="/quizpage">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition mt-4">
              Retourner à la liste des quizs
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizPlay;
