import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }
        
    }, [navigate]);
};

export default ProtectedPage;
