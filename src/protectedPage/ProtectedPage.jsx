import { Navigate, Outlet } from "react-router-dom";

const ProtectedPage = () => {
    const token = localStorage.getItem("token"); // Vérifie si l'utilisateur est connecté

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedPage;
