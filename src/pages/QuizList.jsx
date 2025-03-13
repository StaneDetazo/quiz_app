import { useState } from "react";
import { Link } from "react-router-dom";

const QuizList = () => {
  // Données mockées (remplacées par API plus tard)
  const [quizzes] = useState([
    { id: 1, title: "Quiz React", category: "Développement", level: "Facile" },
    { id: 2, title: "Quiz Histoire", category: "Culture générale", level: "Moyen" },
    { id: 3, title: "Quiz Mathématiques", category: "Sciences", level: "Difficile" },
  ]);

  return (
    <div className="container">
      <h2>Liste des Quiz</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <h3>{quiz.title}</h3>
            <p>Catégorie : {quiz.category}</p>
            <p>Niveau : {quiz.level}</p>
            <Link to={`/quiz/${quiz.id}`}>
              <button>Commencer</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
