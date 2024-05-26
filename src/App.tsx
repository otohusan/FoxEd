import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PlayQuiz, ReviewQuiz, PrepareQuiz, ChooseQuizData } from "./pages";
import { reviewQuizInitialValue } from "./assets/reviewQuizzes";
import { allQuizzes } from "./assets/allQuizData";
import { quizData2 } from "./assets/quizData2";
import { QuizFormat, ReviewQuizType } from "../type/index.ts";

// import { HelmetProvider } from "react-helmet-async";

function App() {
  // 復習が必要な問題を数字で管理する、そのために問題を解くページには更新関数を与えてる
  const [reviewQuizzes, setReviewQuizzes] = useState<ReviewQuizType[]>(
    reviewQuizInitialValue
  );

  const [QuizIndex, setQuizIndex] = useState<number>(0);

  // 利用するクイズのデータを保持
  const [quizzes, setQuizzes] = useState<QuizFormat>(quizData2);

  return (
    <>
      {/* <HelmetProvider> */}
      <Routes>
        <Route
          path="/PlayQuiz"
          element={
            <PlayQuiz
              setReviewQuizzes={setReviewQuizzes}
              QuizIndex={QuizIndex}
              setQuizIndex={setQuizIndex}
              quizzes={quizzes.body}
            />
          }
        />

        <Route
          path="/ReviewQuiz"
          element={
            <ReviewQuiz
              reviewQuizzes={reviewQuizzes}
              setReviewQuizzes={setReviewQuizzes}
            />
          }
        />

        <Route
          path="/PrepareQuiz"
          element={
            <PrepareQuiz
              quizzes={quizzes.body}
              quizLabel={quizzes.label}
              setCurrentQuizIndex={setQuizIndex}
            />
          }
        />

        <Route
          path="/"
          // 全てのクイズのデータを渡して、選択させる
          element={
            <ChooseQuizData quizzes={allQuizzes} setQuizzes={setQuizzes} />
          }
        />
      </Routes>
      {/* </HelmetProvider> */}
    </>
  );
}

export default App;
