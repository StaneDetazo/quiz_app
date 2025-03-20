import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getQuizOfPlayer, getRandomQuiz } from "../api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const QuizResults = () => {
  const { username, token } = useAuth();
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const navigate = useNavigate();

  // États pour les sélections utilisateur
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  // Options disponibles
  const categories = ["Clubs", "Football", "histoire", "géographie"];
  const levels = ["Facile", "Moyen", "Difficile"];

  useEffect(() => {
    if (username && token) {
      getQuizOfPlayer(username, token)
        .then((data) => {
          setQuizResults(data.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Erreur lors du chargement des résultats.");
          setLoading(false);
        });
    }
  }, [username, token]);

  const handleTrain = async () => {
    if (!selectedCategory || !selectedLevel) {
      setError("Veuillez choisir une catégorie et un niveau.");
      return;
    }

    setLoadingQuiz(true);
    try {
      const data = await getRandomQuiz(token, 5, selectedCategory, selectedLevel);
      console.log(data);
      
      if (data && data.quiz_id) {
        navigate(`/playerquizplay/${data.quiz_id}`);
      } else {
        setError("Impossible de générer un quiz.");
      }
    } catch (error) {
      setError("Erreur lors de la création du quiz.");
    } finally {
      setLoadingQuiz(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-4">Résultats de vos Quiz</h1>
      {loading && <div className="text-center text-blue-500">Chargement...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {quizResults.length > 0 ? (
        quizResults.map((quiz) => (
          quiz.quiz.categorie !== undefined && <div key={`${quiz.quiz.qz_id}-${quiz.createdAt}`} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-2">{quiz.quiz.categorie + " - " + quiz.quiz.niveau}</h2>
          <p className="text-lg">
            Score: <span className="font-bold">{quiz.score}</span> / {quiz.quiz.questions?.length * 10} pts
          </p>
          <p className="text-gray-600">
            Date: {new Date(quiz.playedAt).toLocaleDateString()} à {new Date(quiz.playedAt).toLocaleTimeString()}
          </p>
          <div className="mt-4">
            <Link to={`/playerquizplay/${quiz.quiz.qz_id}`}>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                Rejouer ce quiz
              </button>
            </Link>
          </div>
        </div>
          
        ))
      ) : (
        <p className="text-center text-gray-500">Aucun résultat trouvé.</p>
      )}

      {/* Sélecteurs pour choisir la catégorie et le niveau */}
      <div className="mt-6 text-center">
        <div className="mb-4">
          <label className="block font-semibold text-lg mb-2">Choisir une catégorie :</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">-- Sélectionner --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-lg mb-2">Choisir un niveau :</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">-- Sélectionner --</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Bouton pour générer un quiz aléatoire */}
        <button
          onClick={handleTrain}
          disabled={loadingQuiz}
          className={`px-6 py-2 rounded-lg transition ${
            loadingQuiz ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loadingQuiz ? "Chargement..." : "M'entraîner"}
        </button>

        <Link to="/playerquizpage">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition ml-4">
            Voir d'autres quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;
