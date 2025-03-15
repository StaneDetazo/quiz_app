import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis."),
    firstname: Yup.string().required("Le prenom est requis"),
    email: Yup.string().required("L'email est requis.").email("Email invalide"),
    password: Yup.string().required("Le mot de passe est requis.").min(6, "minimum six caractères."),
})

export default registerSchema;