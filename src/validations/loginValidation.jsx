import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string().required("L'email est requis.").email("Email invalide"),
    password: Yup.string().required("Le mot de passe est requis."),
})

export default loginSchema;