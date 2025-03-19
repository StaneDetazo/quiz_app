import React from "react";
import { Link } from "react-router-dom";



const QuizResults = ({ score, totalScore, answers, correctAnswers }) => {

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Résultats du Quiz</h1>

      {/* Affichage du score global */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Votre score</h2>
        <p className="text-lg">Vous avez obtenu {score} sur {totalScore} points.</p>
      </div>

      {/* Affichage des réponses */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Résumé de vos réponses</h2>
        {answers.map((answer, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium mb-1">Question {index + 1}: {answer.question}</p>
            <p className={`font-medium ${answer.selectedAnswer === correctAnswers[index] ? "text-green-500" : "text-red-500"}`}>
              {answer.selectedAnswer === correctAnswers[index] ? "Réponse correcte" : "Réponse incorrecte"}
            </p>
            <p className="italic">Votre réponse: {answer.selectedAnswer}</p>
            <p className="italic">Réponse correcte: {correctAnswers[index]}</p>
          </div>
        ))}
      </div>

      {/* Retour à la page d'accueil ou à la liste des quiz */}
      <div className="mt-6 text-center">
        <Link to="/home">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Retour à l'accueil
          </button>
        </Link>
        <Link to="/quizpage">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition ml-4">
            Voir d'autres quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;
