import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Utilisation du contexte
import loginSchema from "../validations/loginValidation";
import { login } from "../api";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const { login: loginContext } = useAuth(); // Récupérer la fonction login du contexte
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        try {
            const { token, role_id, username } = await login(data);
            
            // console.log(token, role_id, username);
            
            if (token && role_id && username) {
                loginContext(token, role_id, username); // Stocker le token dans le contexte
                role_id == 2 ? navigate("/adminquestion") : navigate("/playerquizplay") 
            }
        } catch (error) {
            setError("Le mot de passe ou l'username est incorrect");
            console.error("Erreur lors de la connexion", error);
        }
    };

    return (
        <div className="login-container">
            <div className="hero bg-gray-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Connectez-vous maintenant!</h1>
                    </div>
                    <div className="card bg-white shadow-lg rounded-lg p-4 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            {error && <p className="text-center text-red-600">{error}</p>}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset className="fieldset">
                                    <label htmlFor="username">Username</label>
                                    <input {...register("username")} id="username" className="input" type="text" placeholder="Username" />
                                    {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                                    <label htmlFor="password">Mot de passe</label>
                                    <input {...register("password")} id="password" className="input" type="password" placeholder="Mot de passe" />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                                    <button type="submit" className="btn bg-blue-500 hover:bg-blue-600 text-white mt-4">Se connecter</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
