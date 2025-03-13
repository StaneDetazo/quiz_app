import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("joueur"); // Valeur par défaut
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inscription :", { email, password, role });
    navigate("/login"); // Redirection après inscription (temporaire)
  };

  return (
    <div className="container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="joueur">Joueur</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
