import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "/api/quiz"; 

const QuizManager = () => {
  const [quizList, setQuizList] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    categorie: "",
    niveau: "",
    score: 0,
    questions: [],
  });

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setQuizList(response.data.data);
    } catch (error) {
      console.error("Erreur de chargement des quiz:", error);
    }
  };

  const handleAddQuiz = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, newQuiz);
      setQuizList([...quizList, response.data.data]);
      setNewQuiz({ categorie: "", niveau: "", score: 0, questions: [] });
    } catch (error) {
      console.error("Erreur lors de l'ajout du quiz:", error);
    }
  };

  const handleDeleteQuiz = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setQuizList(quizList.filter((quiz) => quiz.qz_id !== id));
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion des Quiz</h2>

      {/* Formulaire d'ajout */}
      <div className="mb-4 p-4 border rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Ajouter un Quiz</h3>
        <input
          type="text"
          placeholder="Catégorie"
          className="border p-2 rounded w-full mb-2"
          value={newQuiz.categorie}
          onChange={(e) => setNewQuiz({ ...newQuiz, categorie: e.target.value })}
        />
        <input
          type="text"
          placeholder="Niveau"
          className="border p-2 rounded w-full mb-2"
          value={newQuiz.niveau}
          onChange={(e) => setNewQuiz({ ...newQuiz, niveau: e.target.value })}
        />
        <input
          type="number"
          placeholder="Score"
          className="border p-2 rounded w-full mb-2"
          value={newQuiz.score}
          onChange={(e) => setNewQuiz({ ...newQuiz, score: Number(e.target.value) })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddQuiz}
        >
          Ajouter
        </button>
      </div>

      {/* Liste des quiz */}
      <ul className="border rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-2">Liste des Quiz</h3>
        {quizList.length === 0 ? (
          <p>Aucun quiz trouvé.</p>
        ) : (
          quizList.map((quiz) => (
            <li key={quiz.qz_id} className="flex justify-between items-center border-b p-2">
              <span>{quiz.categorie} - {quiz.niveau}</span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDeleteQuiz(quiz.qz_id)}
              >
                Supprimer
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default QuizManager;
