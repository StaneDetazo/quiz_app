import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addQuiz, updateQuiz, getQuizById, getQuestions } from "../api";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const QuizForm = () => {
  const { token, role_id } = useAuth(); // Récupérer les infos d'authentification
  const navigate = useNavigate();
  const { id } = useParams();

  // États pour le quiz
  const [quizData, setQuizData] = useState({
    categorie: "",
    niveau: "",
    questions: [],
    score: 0,
  });

  // États pour stocker les questions disponibles, les catégories et les niveaux
  const [allQuestions, setAllQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions(); // Charger toutes les questions disponibles
    if (!token) {
      // Si pas de token, rediriger vers la page de connexion
      navigate("/login");
    } else if (role_id !== "2") {  // Vérifier le rôle
      // Si le rôle n'est pas "2", rediriger vers une autre page (ou afficher un message d'erreur)
      navigate("/login");
    } else if (id) {
      fetchQuiz(id); // Si on est dans un mode édition, récupérer la question
    }
  }, [token, role_id, id, navigate]);

  // Charger les détails d'un quiz pour modification
  const fetchQuiz = async (id) => {
    try {
      const data = await getQuizById(id, token);
      const datas = data.data
      console.log();

      setQuizData({
        categorie: datas.categorie || "",
        niveau: datas.niveau || "",
        questions: Array.isArray(datas.questions) ? datas.questions.map(q => q.q_id) : [],
        score: datas.score || 0,
      });

    } catch (error) {
      console.error("Erreur lors du chargement du quiz :", error);
    }
  };


  // Charger toutes les questions disponibles et extraire les catégories et niveaux uniques
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(token);
      setAllQuestions(data);

      // Extraire les catégories et niveaux uniques
      const uniqueCategories = [...new Set(data.map((q) => q.categorie))].sort();
      const uniqueNiveaux = [...new Set(data.map((q) => q.niveau))].sort();

      setCategories(uniqueCategories);
      setNiveaux(uniqueNiveaux);
    } catch (error) {
      console.error("Erreur lors du chargement des questions", error);
    }
  };

  // Mettre à jour les questions filtrées en fonction de la catégorie et du niveau sélectionnés
  useEffect(() => {
    if (quizData.categorie && quizData.niveau) {
      const filtered = allQuestions.filter(
        (q) => q.categorie === quizData.categorie && q.niveau === quizData.niveau
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions([]);
    }
  }, [quizData.categorie, quizData.niveau, allQuestions]);

  // Mise à jour des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestion de la sélection des questions
  const handleQuestionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setQuizData((prevData) => ({
      ...prevData,
      questions: selectedOptions,
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateQuiz(id, quizData, token);
      } else {
        await addQuiz(quizData, token);
      }
      navigate("/adminquizzes");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="container mx-auto p-4">
        <Navbar />

        <h1 className="text-2xl font-bold mb-4">{id ? "Modifier" : "Ajouter"} un Quiz</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
          {/* Catégorie */}
          <div className="mb-4">
            <label className="block text-gray-700">Catégorie</label>
            <select
              name="categorie"
              value={quizData.categorie}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Niveau */}
          <div className="mb-4">
            <label className="block text-gray-700">Niveau</label>
            <select
              name="niveau"
              value={quizData.niveau}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionner un niveau</option>
              {niveaux.map((niv) => (
                <option key={niv} value={niv}>
                  {niv}
                </option>
              ))}
            </select>
          </div>

          {/* Sélection des Questions */}
          <div className="mb-4">
            <label className="block text-gray-700">Sélectionner les Questions</label>
            <select
              multiple
              name="questions"
              value={quizData.questions}
              onChange={handleQuestionChange}
              required
              className="w-full border p-2 rounded"
            >
              {filteredQuestions.map((question) => (
                <option key={question.q_id} value={question.q_id}>
                  {question.q_id + " - " + question.question}
                </option>
              ))}
            </select>
          </div>

          {/* Score total du quiz */}
          <div className="mb-4">
            <label className="block text-gray-700">Score</label>
            <input
              type="number"
              name="score"
              value={quizData.score}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Bouton Submit */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {id ? "Modifier" : "Ajouter"}
          </button>
          <a type="button" href="/quizzes" className="bg-gray-700 text-white px-4 py-2 mx-3 rounded">
            Annuler
          </a>
        </form>
      </div>
    </div>

  );
};

export default QuizForm;
