import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PlayQuiz, ReviewQuiz } from "./pages";
import { reviewQuizzesIndex } from "./assets/reviewQuizzes";

function App() {
  // 復習が必要な問題を数字で管理する、そのために問題を解くページには更新関数を与えてる
  const [reviewQuizzes, setReviewQuizzes] =
    useState<number[]>(reviewQuizzesIndex);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<PlayQuiz setReviewQuizzes={setReviewQuizzes} />}
        />

        <Route
          path="/ReviewQuiz"
          element={<ReviewQuiz reviewQuizzes={reviewQuizzes} />}
        />
      </Routes>
    </>
  );
}

export default App;
