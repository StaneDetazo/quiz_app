import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    username: Yup.string().required("Le username est requis."),
    password: Yup.string().required("Le mot de passe est requis."),
})

export default loginSchema;