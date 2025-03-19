import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    username: Yup.string().required("Le username est requis."),
    score: Yup.number().required("Le score est requis."),
    role: Yup.number().required("Le role est requis."),
    password: Yup.string().required("Le mot de passe est requis.").min(6, "minimum six caractères."),
})

export default registerSchema;