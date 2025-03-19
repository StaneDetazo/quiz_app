import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 shadow-md mb-3">
      <div className="flex-1">
        <a href="/quizpage" className="btn btn-ghost text-xl">Accueil</a>
      </div>
      <div className="flex-1">
        <a href="/quizresults" className="btn btn-ghost text-xl">Résultat et amélioration</a>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Classement</a>
      </div>
      <div className="flex gap-2">
        <input type="text" placeholder="Chercher un quiz" className="input input-bordered w-24 md:w-auto" />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="img profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li><a>Thème adapté</a></li>
            <li><a>Déconnexion</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar