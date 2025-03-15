import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import loginSchema from "../validations/loginValidation"; // validation des champs du formulaire de connexion

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        // e.preventDefault();
        console.log("Tentative de connexion :", { email, password });
        navigate("/quiz"); // Redirection après login (temporaire)
    };

    return (
        <div className="login-container">
            <div className="hero bg-gray-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Connectez-vous maintenant!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                            et a id nisi.
                        </p>
                    </div>

                    <div className="card bg-white shadow-lg rounded-lg p-4 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset className="fieldset">
                                    <label className="fieldset-label" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        {...register("email")}
                                        id="email"
                                        className="input focus:outline-none focus:border-blue-500"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                                    <label className="fieldset-label" htmlFor="password">
                                        Mot de passe
                                    </label>
                                    <input
                                        {...register("password")}
                                        id="password"
                                        className="input focus:outline-none focus:border-blue-500"
                                        type="password"
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                    <div>
                                        <a className="link link-hover" href="/register">
                                            Vous n'avez pas encore de compte ?<span className="text-blue-500 hover:text-blue-600"> S'inscrire</span> 
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn bg-blue-500 hover:bg-blue-600 text-white mt-4"
                                    >
                                        Se connecter
                                    </button>
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
