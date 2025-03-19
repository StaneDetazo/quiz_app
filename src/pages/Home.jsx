import { Link } from "react-router-dom";

const Home = () => {
  // Données statiques pour les meilleurs scores
  const topResults = [
    { id: 1, user: "Alice", score: 95 },
    { id: 2, user: "Bob", score: 90 },
    { id: 3, user: "Charlie", score: 85 },
    { id: 4, user: "David", score: 80 },
    { id: 5, user: "Emma", score: 75 },
  ];

  return (
    <div className="home-pag mx-auto p-7 min-h-screen">
      {/* Titre principal */}
      <h1 className="text-2xl font-bold text-center mb-4">Bienvenue sur Quiz App !</h1>
      <p className="text-center text-gray-600 mb-8">
        Testez vos connaissances avec des quiz interactifs et défiez les meilleurs scores !
      </p>

      {/* Affichage des meilleurs résultats */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">🏆 Top 5 des meilleurs scores</h2>
        <ul className="space-y-3">
          {topResults.map((result, index) => (
            <li key={result.id} className="flex justify-between p-3 border rounded-lg shadow-sm transition-all hover:scale-x-105">
              <span className="font-medium">{index + 1}. {result.user}</span>
              <span className="text-blue-500 font-semibold">{result.score} pts</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center">
          <Link to="/">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
              Voir plus
            </button>
          </Link>
        </div>
      </div>

      {/* Section Connexion / Inscription */}
      <div className="flex justify-center space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
            Se connecter
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
            S'inscrire
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

// import { Link } from "react-router-dom";

// const Home = ({ results }) => {
//   return (
//     <div className="container mx-auto p-6">
//       {/* Titre principal */}
//       <h1 className="text-3xl font-bold text-center mb-4">Bienvenue sur Quiz App !</h1>
//       <p className="text-center text-gray-600 mb-8">
//         Testez vos connaissances avec des quiz interactifs et défiez les meilleurs scores !
//       </p>

//       {/* Affichage des meilleurs résultats */}
//       <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
//         <h2 className="text-2xl font-semibold mb-4">🏆 Top 5 des meilleurs scores</h2>
//         {results.length > 0 ? (
//           <ul className="space-y-3">
//             {results.slice(0, 5).map((result, index) => (
//               <li key={result.id} className="flex justify-between p-3 border rounded-lg shadow-sm">
//                 <span className="font-medium">{index + 1}. {result.user}</span>
//                 <span className="text-blue-500 font-semibold">{result.score} pts</span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">Aucun résultat disponible pour le moment.</p>
//         )}
//         {results.length > 5 && (
//           <div className="mt-4 text-center">
//             <Link to="/leaderboard">
//               <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
//                 Voir plus
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Section Connexion / Inscription */}
//       <div className="flex justify-center space-x-4">
//         <Link to="/login">
//           <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">
//             Se connecter
//           </button>
//         </Link>
//         <Link to="/register">
//           <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
//             S'inscrire
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;