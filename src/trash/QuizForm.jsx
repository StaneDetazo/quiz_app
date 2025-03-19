import { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
    const [nbQuiz, setNbQuiz] = useState(null);
    const [formData, setFormData] = useState({
        categorie: '',
        niveau: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setNbQuiz(Math.floor(Math.random(5) * 11));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/quiz/random/${nbQuiz}?categorie=${formData.categorie}&niveau=${formData.niveau}`, formData);
            console.log(formData);
            
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Categorie</label>
                <input
                    type="text"
                    name="categorie"
                    value={formData.categorie}
                    onChange={handleChange}
                    className="input"
                />
            </div>
            <div>
                <label className="block">Niveau</label>
                <input
                    type="text"
                    name="niveau"
                    value={formData.niveau}
                    onChange={handleChange}
                    className="input"
                />
            </div>
            <button type="submit" className="btn">Create Quiz</button>
        </form>
    );
};

export default QuizForm;
