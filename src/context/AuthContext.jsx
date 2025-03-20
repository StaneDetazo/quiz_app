import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [username, setUsername] = useState(localStorage.getItem("username") || null);
    const [role_id, setRoleId] = useState(localStorage.getItem("role_id") || null);
    const navigate = useNavigate(); 

    // Mettre à jour le token et role_id après connexion
    const login = (newToken, newRoleId, newUsername) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("role_id", newRoleId);
        localStorage.setItem("username", newUsername);
        setToken(newToken);
        setRoleId(newRoleId);
    };

    // Déconnexion : supprimer le token, le username et le role_id
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        localStorage.removeItem("username");
        setToken(null);
        setRoleId(null);
        setUsername(null);
        navigate("/login")
        // window.location.href = "/login"; 
    };

    return (
        <AuthContext.Provider value={{ token, role_id, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);
