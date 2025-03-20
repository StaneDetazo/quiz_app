import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
    // const [open, setOpen] = useState(false);
    const { role_id } = useAuth()
    return (
        role_id == "2" && (
            <div className="flex h-auto">
                {/* Sidebar */}
                {/* <div
        className={`bg-gray-800 text-white h-full transition-all duration-300 ${
            open ? "w-64" : "w-16"
            }`} */}
                <div className="bg-gray-800 text-white h-full transition-all duration-300 w-64">
                    <div className="p-4">
                        {/* Bouton pour ouvrir/fermer */}
                        {/* <button
            onClick={() => setOpen(!open)}
            className="p-2 bg-blue-500 text-white rounded-md mb-4"
          >
            {open ? "X" : "|||"}
          </button> */}

                        {/* Contenu de la barre latérale */}
                        <ul className="mt-10">
                            <li className="border-b-1">
                                <a
                                    href="/adminquizzes"
                                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                                >
                                    Gérer les quiz
                                </a>
                            </li>
                            <li className="border-b-1">
                                <a
                                    href="/adminquestion"
                                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                                >
                                    Gérer les questions
                                </a>
                            </li>
                            <li className="border-b-1">
                                <a
                                    href="/playerclassementresult"
                                    className="block py-2 px-4 hover:bg-gray-700 rounded-md"
                                >
                                    Voir le classement
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        )

    );
};

export default SideBar;
