import axios from "axios";

const API_URL = "/question";
const API_URL_QUIZ = "/quiz";
const API_URL_AUTH = "/auth";

// Connexion (stocke le token dans le localStorage via le contexte)
export const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL_AUTH}/login`, loginData);

        if (response.data) {
            return { token: response.data.token, role_id: response.data.role_id, username: response.data.username }; // Retourne un objet contenant les infos de l'utilisateur
        }

        return null;
    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        throw error;
    }
};


// Déconnexion (est gérée dans le contexte)
export const logout = async () => { };

// Fonction générique pour récupérer les headers avec token
const getAuthHeaders = (token) => ({
    headers: { Authorization: token ? `Bearer ${token}` : "" },
    withCredentials: true,
});

/* QUESTIONS */
export const getQuestions = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/all`, getAuthHeaders(token));
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors du chargement des questions", error);
        throw error;
    }
};

export const addQuestion = async (questionData, token) => {
    try {
        const response = await axios.post(`${API_URL}/add`, questionData, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la question", error);
        throw error;
    }
};

export const getQuestionById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/read/${id}`, getAuthHeaders(token))
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors du chargement de la question", error);
        throw error;
    }
};

export const updateQuestion = async (id, questionData, token) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, questionData, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la question", error);
        throw error;
    }
};

export const deleteQuestion = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/delete/${id}`, getAuthHeaders(token));
    } catch (error) {
        console.error("Erreur lors de la suppression de la question", error);
        throw error;
    }
};


/* AUTHENTIFICATION */
export const signup = async (signupData) => {
    try {
        const response = await axios.post(`${API_URL_AUTH}/signup`, signupData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'inscription", error);
        throw error;
    }
};

/* QUESTIONS */
// export const getQuestions = async () => {
//     try {
//         const token = getToken();

//         const response = await axios.get(`${API_URL}/all`, {
//             headers: {
//                 Authorization: token ? `Bearer ${token}` : "",
//             },
//             withCredentials: true,
//         });

//         return response.data.data;
//     } catch (error) {
//         console.error("Erreur lors du chargement des questions", error);
//         throw error;
//     }
// };

// export const deleteQuestion = async (id) => {
//     try {
//         const token = getToken();

//         await axios.delete(`${API_URL}/delete/${id}`, {
//             headers: {
//                 Authorization: token ? `Bearer ${token}` : "",
//             },
//             withCredentials: true,
//         });
//     } catch (error) {
//         console.error("Erreur lors de la suppression de la question", error);
//         throw error;
//     }
// };


/* QUIZZES */
export const getQuizzes = async () => {
    try {
        const response = await axios.get(`${API_URL_QUIZ}/all`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors du chargement des quizzes", error);
        throw error;
    }
};

export const getQuizById = async (id) => {
    try {
        const response = await axios.get(`${API_URL_QUIZ}/search/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors du chargement du quiz", error);
        throw error;
    }
};

export const addQuiz = async (quizData) => {
    try {
        const response = await axios.post(`${API_URL_QUIZ}/add`, quizData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout du quiz", error);
        throw error;
    }
};

export const updateQuiz = async (id, quizData) => {
    try {
        const response = await axios.put(`${API_URL_QUIZ}/quizzes/${id}`, quizData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du quiz", error);
        throw error;
    }
};

export const deleteQuiz = async (id) => {
    try {
        const response = await axios.delete(`${API_URL_QUIZ}/quizzes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la suppression du quiz", error);
        throw error;
    }
};
