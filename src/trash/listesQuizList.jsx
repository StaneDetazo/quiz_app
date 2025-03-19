import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // gérer les requêtes API

const QuizList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Requête GET pour récupérer toutes les questions disponibles
    axios
      .get("/api/question/all")
      .then((response) => {
        setQuestions(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors du chargement des quiz.");
        setLoading(false);
      });
  }, []);

  // Fonction pour regrouper les questions par catégorie et niveau
  const groupByCategory = (questions) => {
    return questions.reduce((grouped, question) => {
      const category = question.categorie || "Autres";
      const level = question.niveau || "Inconnu";
      if (!grouped[level]) {
        grouped[level] = [];
      }
      grouped[level].push(question);

      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(question);
      return grouped;
    }, {});
  };

  // const groupByLevel = (questions) => {
  //   return questions.reduce((grouped, question) => {
  //     const level = question.niveau || "Inconnu";
  //     if (!grouped[level]) {
  //       grouped[level] = [];
  //     }
  //     grouped[level].push(question);
  //     return grouped;
  //   }, {});
  // };

  const groupedByCategory = groupByCategory(questions);
  // const groupedByLevel = groupByLevel(questions);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Liste des Quiz</h2>

      {loading ? (
        <p className="text-center animate-pulse text-gray-500">Chargement...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          {/* Affichage des quiz regroupés par catégorie */}
          <h3 className="text-xl font-semibold mb-4">Par Catégorie</h3>
          {Object.keys(groupedByCategory).map((category) => (
            <div key={category} className="mb-6">
              <h4 className="font-bold">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedByCategory[category].map((quiz) => (
                  <div
                    key={quiz.q_id}
                    className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
                  >
                    {/* <h3 className="text-lg font-semibold mb-2">
                      {quiz.question}
                    </h3> */}
                    <p className="text-gray-600">
                      Catégorie :{" "}
                      <span className="font-medium">{quiz.categorie}</span>
                    </p>
                    <p className="text-gray-600">
                      Niveau :{" "}
                      <span className="font-medium">{quiz.niveau}</span>
                    </p>
                    <div className="mt-4">
                      <Link to={`/quiz/${quiz.q_id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                          Commencer
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Affichage des quiz regroupés par niveau */}
          {/* <h3 className="text-xl font-semibold mb-4">Par Niveau</h3>
          {Object.keys(groupedByLevel).map((level) => (
            <div key={level} className="mb-6">
              <h4 className="font-bold">{level}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedByLevel[level].map((quiz) => (
                  <div
                    key={quiz.q_id}
                    className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {quiz.question}
                    </h3>
                    <p className="text-gray-600">
                      Catégorie :{" "}
                      <span className="font-medium">{quiz.categorie}</span>
                    </p>
                    <p className="text-gray-600">
                      Niveau :{" "}
                      <span className="font-medium">{quiz.niveau}</span>
                    </p>
                    <div className="mt-4">
                      <Link to={`/quiz/${quiz.q_id}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                          Commencer
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))} */}
        </div> 
      )}
    </div>
  );
};

export default QuizList;
