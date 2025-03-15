import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validations/registerValidation";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("joueur"); // Valeur par défaut
  const navigate = useNavigate();

  const onSubmit = (e) => {
    // e.preventDefault();
    console.log("Inscription :", { email, password, role });
    navigate("/login"); // Redirection après inscription (temporaire)
  };

  return (
    <div className="login-container">
      <div className="hero bg-gray-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Inscrivez-vous dès maintenant!
            </h1>
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
                  <label className="fieldset-label" htmlFor="name">
                    Nom
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    className="input focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Votre nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}

                  <label className="fieldset-label" htmlFor="firstname">
                    Prenom
                  </label>
                  <input
                    {...register("firstname")}
                    id="firstname"
                    className="input focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Votre prenom"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  {errors.firstname && (
                    <p className="text-red-500">{errors.firstname.message}</p>
                  )}

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
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}

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
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}

                  <label className="fieldset-label" htmlFor="password">
                    Rôle
                  </label>
                  <select
                    className="input focus:outline-none focus:border-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="joueur">Joueur</option>
                    <option value="admin">Créateur de quiz</option>
                  </select>
                  <div>
                    <a className="link link-hover" href="/login">
                      Vous avez déjà un compte ?
                      <span className="text-blue-500 hover:text-blue-600">
                        {" "}
                        Se connecter
                      </span>
                    </a>
                  </div>

                  <div className="flex w-full flex-col">
                    <button
                      type="submit"
                      className="btn bg-blue-500 hover:bg-blue-600 text-white mt-4"
                    >
                      S'inscrire
                    </button>

                    <div className="divider">OU</div>
                    <div className="flex justify-around flex-">
                      <button
                        type=""
                        className="btn bg-blue-500 hover:bg-blue-600 text-white basis-1/2"
                      >
                        Google
                      </button>
                      <button
                        type=""
                        className="btn bg-blue-500 hover:bg-blue-600 text-white basis-1/2"
                      >
                        facebook
                      </button>
                    </div>

                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
