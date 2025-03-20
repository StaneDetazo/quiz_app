/**
 * PAGE DE LISTE DES QUESTIONS CREEE
 */
import { useEffect, useState } from "react";
import { getQuestions, deleteQuestion } from "../api";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const QuestionsList = () => {
  const { token } = useAuth()
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const questionsPerPage = 15;

  useEffect(() => {
    if (token) {
      fetchQuestions();
    }
  }, [token]);

  const fetchQuestions = async () => {
    try {
      // 
      const data = await getQuestions(token);
      setQuestions(data);
      setFilteredQuestions(data); // Initialiser avec toutes les questions
    } catch (error) {
      console.error("Erreur lors du chargement des questions", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Voulez-vous vraiment supprimer cette question ?")) {
      try {
        await deleteQuestion(id, token);
        fetchQuestions(); // Recharger la liste après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  // Filtrage des questions
  useEffect(() => {
    let filtered = questions;

    if (categoryFilter) {
      filtered = filtered.filter((q) => q.categorie === categoryFilter);
    }
    if (levelFilter) {
      filtered = filtered.filter((q) => q.niveau === levelFilter);
    }

    setFilteredQuestions(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après un filtrage
  }, [categoryFilter, levelFilter, questions]);

  // Pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className="flex">
      <SideBar />
      <div className="container mx-auto p-4">
        <Navbar />
        <h1 className="text-2xl font-bold mb-4">Liste des Questions</h1>
        <div className="mb-4 flex gap-4">
          <Link to="/adminquestion/add" className="bg-blue-500 text-white px-4 py-2 rounded">
            + Ajouter une question
          </Link>

          {/* Filtre par catégorie */}
          <select
            className="border px-4 py-2 rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="Histoire">Histoire</option>
          </select>

          {/* Filtre par niveau */}
          <select
            className="border px-4 py-2 rounded"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">Tous les niveaux</option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>

        <table className="min-w-full bg-white shadow-md rounded mt-4">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Question</th>
              <th className="py-2 px-4">Propositions</th>
              <th className="py-2 px-4">Réponse</th>
              <th className="py-2 px-4">Niveau</th>
              <th className="py-2 px-4">Catégorie</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((q) => (
                <tr key={q.q_id} className="border-b">
                  <td className="py-2 px-4">{q.q_id}</td>
                  <td className="py-2 px-4">{q.question}</td>
                  <td className="py-2 px-4">
                    <ul>
                      {q.autres.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </td>
                  <td className="py-2 px-4">{q.reponse}</td>
                  <td className="py-2 px-4">{q.niveau}</td>
                  <td className="py-2 px-4">{q.categorie}</td>
                  <td className="py-2 px-4">
                    <Link to={`/adminquestion/${q.q_id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(q.q_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">Aucune question trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          >
            Précédent
          </button>

          <span>Page {currentPage} sur {totalPages}</span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
