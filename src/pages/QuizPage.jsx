import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { id } = useParams(); // Récupérer l'ID du quiz dans l'URL
  const navigate = useNavigate();

  // Données de questions mockées
  const questionsMock = {
    1: [
      { id: 1, question: "React est développé par ?", options: ["Google", "Facebook", "Twitter"], answer: "Facebook" },
      { id: 2, question: "Quel hook permet de gérer un état ?", options: ["useState", "useEffect", "useRef"], answer: "useState" },
    ],
    2: [
      { id: 1, question: "Qui a découvert l'Amérique ?", options: ["Napoléon", "Christophe Colomb", "Einstein"], answer: "Christophe Colomb" },
      { id: 2, question: "En quelle année a eu lieu la Révolution française ?", options: ["1492", "1789", "1914"], answer: "1789" },
    ],
  };

  const questions = questionsMock[id] || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selected) => {
    if (selected === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate(`/result/${id}?score=${score + 1}`);
    }
  };

  if (questions.length === 0) {
    return <h2>Quiz introuvable</h2>;
  }

  return (
    <div className="container">
      <h2>Question {currentQuestionIndex + 1}/{questions.length}</h2>
      <p>{questions[currentQuestionIndex].question}</p>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuizPage;
