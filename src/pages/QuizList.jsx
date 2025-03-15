import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const QuizList = () => {
  // Données mockées (remplacées par API plus tard)
  const [quizzes] = useState([
    { id: 1, title: "Quiz React", category: "Développement", level: "Facile" },
    { id: 2, title: "Quiz Histoire", category: "Culture générale", level: "Moyen" },
    { id: 3, title: "Quiz Mathématiques", category: "Sciences", level: "Difficile" },
  ]);

  return (
    <div className="container mx-auto p-6">
      <Navbar />

      <h2 className="text-2xl font-bold mb-6 text-center">Liste des Quiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
            <p className="text-gray-600">Catégorie : <span className="font-medium">{quiz.category}</span></p>
            <p className="text-gray-600">Niveau : <span className="font-medium">{quiz.level}</span></p>
            <div className="mt-4">
              <Link to={`/quiz/${quiz.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Commencer
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
