import { useEffect, useState } from "react";
import { getQuizzes } from "../api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";

const QuizPage = () => {
  const { token } = useAuth(); // On récupère le token pour les requêtes API
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (token) {
      fetchQuizzes();
    }
  }, [token]);

  const fetchQuizzes = async () => {
    try {
      const data = await getQuizzes(token);
      console.log("Data retournée par l'API :", data);

      // Filtrer uniquement les objets Quiz valides
      const filteredQuizzes = data.data.filter((quiz) => typeof quiz === "object" && quiz.qz_id);
      setQuizzes(filteredQuizzes);
    } catch (error) {
      console.error("Erreur lors du chargement des quiz", error);
    }
  };

  return (
    token ?
    <div className="container mx-auto p-6">
      <Navbar />
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center mb-8">Tous les Quiz</h1>

      {/* Liste des quiz sous forme de cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz.qz_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{quiz.categorie}</h3>
              <p className="text-gray-600 mb-1">Niveau : <span className="font-medium">{quiz.niveau}</span></p>
              <p className="text-gray-600 mb-1">Score total : <span className="font-medium">{quiz.questions?.length * 10} pts</span></p>
              <p className="text-gray-600 mb-4">⏳ Temps limite : <span className="font-medium">{ 5 }</span></p>
              {/* <p className="text-gray-600 mb-4">⏳ Temps limite : <span className="font-medium">{quiz.time_limit}</span></p> */}
              <Link to={`/playerquizplay/${quiz.qz_id}`}>
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
                  Commencer
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">Aucun quiz disponible.</p>
        )}
      </div>
    </div> : <Login />
  );
};

export default QuizPage;
