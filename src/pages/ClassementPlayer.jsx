import React, { useState, useEffect } from "react";
import { getAllParties } from "../api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ClassementPlayer = () => {
    const { token, username } = useAuth();
    const [classement, setClassement] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            getAllParties(token)
                .then((data) => {
                    // Regrouper les scores par joueur
                    const scoresByPlayer = {};

                    data.data.forEach((partie) => {
                        // Assurer que les données sont cohérentes
                        const player = partie.player.username; // Assurez-vous que c'est 'username' ou le bon attribut
                        if (!scoresByPlayer[player]) {
                            scoresByPlayer[player] = { username: player, totalScore: 0 };
                        }
                        scoresByPlayer[player].totalScore += partie.score;
                        // console.log(partie.player);

                    });

                    // Convertir en tableau et trier par score décroissant
                    const classementArray = Object.values(scoresByPlayer).sort((a, b) => b.totalScore - a.totalScore);
                    setClassement(classementArray);
                    setLoading(false);
                })
                .catch((err) => {
                    setError("Erreur lors du chargement du classement.");
                    setLoading(false);
                });
        }
    }, [token]);

    if (loading) return <div className="text-center p-6">Chargement du classement...</div>;

    return (
        <div className="container mx-auto p-6">
            <Navbar />
            {error && <div className="text-center p-6 text-red-500">{error}</div>}
            <h1 className="text-3xl font-bold text-center mb-6">Classement des joueurs</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3">Position</th>
                            <th className="border p-3">Joueur</th>
                            <th className="border p-3">Score Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classement.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center p-3">Aucun joueur classé pour l'instant.</td>
                            </tr>
                        ) : (
                            classement.map((player, index) => (
                                <tr key={`${player.username}-${index}`} className={`text-center ${username === player.username ? "bg-yellow-200 font-bold" : ""}`}>
                                    <td className="border p-3">{index + 1}</td>
                                    <td className="border p-3">{player.username}</td>
                                    <td className="border p-3">{player.totalScore}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClassementPlayer;
