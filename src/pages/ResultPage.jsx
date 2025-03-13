import { useSearchParams, Link } from "react-router-dom";

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const score = searchParams.get("score") || 0;

  return (
    <div className="container">
      <h2>Résultat</h2>
      <p>Votre score est de {score} points !</p>
      <Link to="/quiz">
        <button>Retour aux quiz</button>
      </Link>
    </div>
  );
};

export default ResultPage;
