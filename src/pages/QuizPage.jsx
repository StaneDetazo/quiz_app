import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const QuizPage = () => {
  // Données statiques pour les quiz
  const quizzes = [
    { id: 1, category: "Science", level: "Facile", totalScore: 50, timeLimit: "10 min" },
    { id: 2, category: "Histoire", level: "Moyenne", totalScore: 70, timeLimit: "15 min" },
    { id: 3, category: "Mathématiques", level: "Difficile", totalScore: 100, timeLimit: "20 min" },
    { id: 4, category: "Géographie", level: "Facile", totalScore: 40, timeLimit: "12 min" },
    { id: 5, category: "Informatique", level: "Moyenne", totalScore: 60, timeLimit: "18 min" },
  ];

  return (
    <div className="container mx-auto p-6">
      <Navbar/>
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center mb-8">Tous les Quiz</h1>

      {/* Liste des quiz sous forme de cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{quiz.category}</h3>
            <p className="text-gray-600 mb-1">Niveau : <span className="font-medium">{quiz.level}</span></p>
            <p className="text-gray-600 mb-1">Score total : <span className="font-medium">{quiz.totalScore} pts</span></p>
            <p className="text-gray-600 mb-4">⏳ Temps limite : <span className="font-medium">{quiz.timeLimit}</span></p>
            <Link to={`/quizplay/${quiz.id}`}>
              <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                Commencer
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
