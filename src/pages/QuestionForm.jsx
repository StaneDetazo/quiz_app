import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addQuestion, updateQuestion, getQuestionById } from "../api";
import SideBar from "../components/SideBar";
import { useAuth } from "../context/AuthContext";

const QuestionForm = () => {
  const { token, role_id } = useAuth(); // Récupérer les infos d'authentification
  const navigate = useNavigate();
  const { id } = useParams(); // Récupérer l'ID si modification

  const [questionData, setQuestionData] = useState({
    question: "",
    reponse: "",
    autres: [],
    categorie: "",
    niveau: "",
    type: "",
    quiz_id: 1, // Par défaut
  });

  useEffect(() => {
    if (!token) {
      // Si pas de token, rediriger vers la page de connexion
      navigate("/login");
    } else if (role_id !== "2") {  // Vérifier le rôle
      // Si le rôle n'est pas "2", rediriger vers une autre page (ou afficher un message d'erreur)
      navigate("/login");
    } else if (id) {
      fetchQuestion(id); // Si on est dans un mode édition, récupérer la question
    }
  }, [token, role_id, id, navigate]); // Dépendances pour la redirection conditionnelle

  const fetchQuestion = async (id) => {
    try {
      const data = await getQuestionById(id, token);      
      setQuestionData(data);
    } catch (error) {
      console.error("Erreur lors du chargement de la question", error);
    }
  };

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleAddProposition = () => {
    setQuestionData({ ...questionData, autres: [...questionData.autres, ""] });
  };

  const handleChangeProposition = (index, value) => {
    const newAutres = [...questionData.autres];
    newAutres[index] = value;
    setQuestionData({ ...questionData, autres: newAutres });
  };

  const handleRemoveProposition = (index) => {
    const newAutres = [...questionData.autres];
    newAutres.splice(index, 1);
    setQuestionData({ ...questionData, autres: newAutres });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateQuestion(id, questionData, token);
      } else {
        await addQuestion(questionData, token);
      }
      navigate("/adminquestion"); // Redirige après l'ajout/modification
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{id ? "Modifier" : "Ajouter"} une Question</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
          <div className="mb-4">
            <label className="block text-gray-700">Question</label>
            <input
              type="text"
              name="question"
              value={questionData.question}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Réponse</label>
            <input
              type="text"
              name="reponse"
              value={questionData.reponse}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Catégorie</label>
            <input
              type="text"
              name="categorie"
              value={questionData.categorie}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Propositions de réponse</label>
            {questionData.autres.map((proposition, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={proposition}
                  onChange={(e) => handleChangeProposition(index, e.target.value)}
                  required
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveProposition(index)}
                  className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProposition}
              className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
            >
              + Ajouter une proposition
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Niveau</label>
            <select
              name="niveau"
              value={questionData.niveau}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionnez un niveau</option>
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={questionData.type}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Sélectionnez un type</option>
              <option value="1">QCM</option>
              <option value="0">Vrai/Faux</option>
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {id ? "Modifier" : "Ajouter"}
          </button>
          <a href="/questions" className="bg-gray-700 text-white px-4 py-2 mx-3 rounded">
            Annuler
          </a>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
