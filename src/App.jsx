import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizList from "./pages/QuizList";
import QuizPage from "./pages/QuizPage";
import QuestionsList from "./pages/QuestionsList";
import QuestionForm from "./pages/QuestionForm";
import QuizForm from "./pages/QuizForm";
import QuizPlay from "./pages/QuizPlay";
import QuizResults from "./pages/QuizResults";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pour le joueur une fois connecté */}
        <Route path="/quizpage" element={<QuizPage />} />
        <Route path="/quizplay/:id" element={<QuizPlay />} />
        <Route path="/quizresults" element={<QuizResults />} />

        {/* Pour les administrateurs, pour gérer les quiz et les questions */}
        {/* quiz */}
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/add" element={<QuizForm />} />
        <Route path="/quizzes/:id" element={<QuizForm />} />
        {/* question */}
        <Route path="/questions" element={<QuestionsList />} />
        <Route path="/questions/add" element={<QuestionForm />} />
        <Route path="/questions/:id" element={<QuestionForm />} />
      
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
