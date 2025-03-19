import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="text-center">
        <h2>404 - Page non trouvée</h2>
        <p>Oops ! La page que vous cherchez n'existe pas.</p>
        <Link to="/" className="text-blue-500">Retour à l'accueil</Link>
    </div>
  )
}

export default NotFound