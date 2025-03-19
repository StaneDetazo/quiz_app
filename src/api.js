import axios from "axios";

// Fonction pour récupérer le token et ajouter l'en-tête d'autorisation
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Créer un intercepteur pour ajouter le token à chaque requête
axios.interceptors.request.use((config) => {
    const headers = getAuthHeaders();
    if (headers.Authorization) {
        config.headers.Authorization = headers.Authorization;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const API_URL = "/question"; // URL API pour les questions
const API_URL_QUIZ = "/quiz"; // URL API pour les quiz
const API_URL_AUTH = "/auth"; // URL API pour l'authentification

// Inscription
export const signup = async (signupData) => {
    try {
        const response = await axios.post(`${API_URL_AUTH}/signup`, signupData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription', error);
        throw error;
    }
};

// Connexion des utilisateurs
export const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL_AUTH}/login`, loginData);
        if (response.data) {
            localStorage.setItem("token", response.data.token); // Stocker le token
        }
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion', error);
        throw error;
    }
};

/*
    QUESTIONS
*/

// Récupérer toutes les questions
export const getQuestions = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);       
        return response.data.data;
    } catch (error) {
        console.error('Erreur lors du chargement des questions', error);
        throw error;
    }
};

// Supprimer une question
export const deleteQuestion = async (id) => {
    try {
        await axios.delete(`${API_URL}/delete/${id}`);
    } catch (error) {
        console.error('Erreur lors de la suppression de la question', error);
        throw error;
    }
};

// Ajouter une question
export const addQuestion = async (questionData) => {
    try {
        const response = await axios.post(`${API_URL}/add`, questionData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la question', error);
        throw error;
    }
};

// Mettre à jour une question
export const updateQuestion = async (id, questionData) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, questionData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la question', error);
        throw error;
    }
};

// Récupérer une question par son ID
export const getQuestionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/read/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur lors du chargement de la question', error);
        throw error;
    }
};

/*
    QUIZ
*/

// Récupérer tous les quizzes
export const getQuizzes = async () => {
    try {
        const response = await axios.get(`${API_URL_QUIZ}/all`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors du chargement des quizzes', error);
        throw error;
    }
};

// Récupérer un quiz par son ID
export const getQuizById = async (id) => {
    try {
        const response = await axios.get(`${API_URL_QUIZ}/search/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors du chargement du quiz', error);
        throw error;
    }
};

// Ajouter un quiz
export const addQuiz = async (quizData) => {
    try {
        const response = await axios.post(`${API_URL_QUIZ}/add`, quizData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout du quiz', error);
        throw error;
    }
};

// Mettre à jour un quiz
export const updateQuiz = async (id, quizData) => {
    try {
        const response = await axios.put(`${API_URL_QUIZ}/quizzes/${id}`, quizData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du quiz', error);
        throw error;
    }
};

// Supprimer un quiz
export const deleteQuiz = async (id) => {
    try {
        const response = await axios.delete(`${API_URL_QUIZ}/quizzes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la suppression du quiz', error);
        throw error;
    }
};
