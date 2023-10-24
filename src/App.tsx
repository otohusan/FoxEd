import "./App.css";
import { Routes, Route } from "react-router-dom";
import { PlayQuiz, ReviewQuiz } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PlayQuiz />} />
        <Route path="/ReviewQuiz" element={<ReviewQuiz />} />
      </Routes>
    </>
  );
}

export default App;
