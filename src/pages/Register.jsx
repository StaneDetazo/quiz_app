import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validations/registerValidation";
import { signup } from "../api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signup(data)
      navigate("/login")
    } catch (error) {
      console.error("error de création de compte", error)
    }
  }

  return (
    <div className="login-container">
      <div className="hero bg-gray-100 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Inscrivez-vous dès maintenant!
            </h1>
          </div>

          <div className="card bg-white shadow-lg rounded-lg p-4 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  {/* champ de username */}
                  <label className="fieldset-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    {...register("username")}
                    id="username"
                    className="input focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Votre username"
                  />
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                  {/* champs de mot de passe */}
                  <label className="fieldset-label" htmlFor="password">
                    Mot de passe
                  </label>
                  <input
                    {...register("password")}
                    id="password"
                    className="input focus:outline-none focus:border-blue-500"
                    type="password"
                    placeholder="Mot de passe"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}

                  {/* champs de score */}
                  <input
                    {...register("score")}
                    id="score"
                    className="input focus:outline-none focus:border-blue-500"
                    type="hidden"
                    placeholder="Votre score"
                    value="0"
                  />
                  {errors.score && (
                    <p className="text-red-500">{errors.score.message}</p>
                  )}
                  
                  {/* champs de role */}
                  <input
                    {...register("role")}
                    id="role"
                    className="input focus:outline-none focus:border-blue-500"
                    type="hidden"
                    placeholder="Votre score"
                    value="1"
                  />
                  {errors.role && (
                    <p className="text-red-500">{errors.role.message}</p>
                  )}

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
