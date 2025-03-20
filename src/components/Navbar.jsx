import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { role_id, logout, username } = useAuth(); // Récupérer role_id de l'utilisateur

  return (
    <div className="navbar bg-base-200 shadow-md mb-3">


      {/* Affichage conditionnel si role_id == 2 */}
      {role_id === "1" && (
        <div> {/* Élément parent englobant obligatoire */}
          <div className="flex-1">
            <Link to="/admin" className="btn btn-primary">Espace Admin</Link>
          </div>
          <div className="flex-1">
            <Link to="/quizpage" className="btn btn-ghost text-xl">Accueil</Link>
          </div>
          <div className="flex-1">
            <Link to="/quizresults" className="btn btn-ghost text-xl">Résultat et amélioration</Link>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Classement</a>
          </div>
        </div>
      )}

      {/* profile et bar de recherche*/}
      <div className="flex gap-2">
        <input type="text" placeholder="Chercher un quiz" className="input input-bordered w-24 md:w-auto" />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="img profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a className="justify-between">{username}</a></li>
            <li><a>Thème adapté</a></li>

            <li><a onClick={logout}>Déconnexion</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
