import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Bienvenue sur Quiz App !</h1>
      <p>Testez vos connaissances avec des quiz interactifs.</p>
      <Link to="/login">
        <button>Se connecter</button>
      </Link>
      <Link to="/register">
        <button>S'inscrire</button>
      </Link>
    </div>
  );
};

export default Home;
