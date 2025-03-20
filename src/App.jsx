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
import ProtectedPage from "./protectedPage/ProtectedPage";
import { AuthProvider } from "./context/AuthContext";
import ClassementPlayer from "./pages/ClassementPlayer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedPage />}>

            <Route path="/playerquizpage" element={<QuizPage />} />
            <Route path="/playerquizplay/:id" element={<QuizPlay />} />
            <Route path="/playerquizresults" element={<QuizResults />} />
            <Route path="/playerclassementresult" element={<ClassementPlayer />} />

            {/* Pour les administrateurs, pour gérer les quiz et les questions */}
            {/* quiz */}
            <Route path="/adminquizzes" element={<QuizList />} />
            <Route path="/adminquizzes/add" element={<QuizForm />} />
            <Route path="/adminquizzes/:id" element={<QuizForm />} />

            {/* question */}
            <Route path="/adminquestion" element={<QuestionsList />} />
            <Route path="/adminquestion/add" element={<QuestionForm />} />
            <Route path="/adminquestion/:id" element={<QuestionForm />} />
          </Route>


          {/* <Route path="*" element={<NotFound />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
