import { useEffect, useState } from "react";
import { getQuizzes, deleteQuiz } from "../api";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Login from "./Login";

const QuizList = () => {
  const { token, role_id } = useAuth();
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
      const filteredQuizzes = data.data.filter(quiz => typeof quiz === "object" && quiz.qz_id);

      setQuizzes(filteredQuizzes);
    } catch (error) {
      console.error("Erreur lors du chargement des quiz", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer ce quiz ?")) {
      try {
        await deleteQuiz(id, token);
        fetchQuizzes(); // Recharger la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  return (
    role_id == "2" ?
    <div className="flex">
      <SideBar />

      <div className="container mx-auto p-4">
        <Navbar />

        <h1 className="text-2xl font-bold mb-4">Liste des Quiz</h1>
        <Link to="/adminquizzes/add" className="bg-blue-500 text-white px-4 py-2 rounded">
          + Ajouter un quiz
        </Link>

        <table className="min-w-full bg-white shadow-md rounded mt-4">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Catégorie</th>
              <th className="py-2 px-4">Niveau</th>
              <th className="py-2 px-4">Score</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <tr key={quiz.qz_id} className="border-b">
                  <td className="py-2 px-4">{quiz.qz_id}</td>
                  <td className="py-2 px-4">{quiz.categorie}</td>
                  <td className="py-2 px-4">{quiz.niveau}</td>
                  <td className="py-2 px-4">{quiz.score}</td>
                  <td className="py-2 px-4">    
                    <Link to={`/adminquizzes/${quiz.qz_id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(quiz.qz_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Aucun quiz trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div> : <Login/>
  );
};

export default QuizList;
