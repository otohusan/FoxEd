import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PlayQuiz, ReviewQuiz, PrepareQuiz, ChooseQuizData } from "./pages";
import { reviewQuizzesIndex } from "./assets/reviewQuizzes";
import { allQuizzes } from "./assets/allQuizData";
import { quizData2 } from "./assets/quizData2";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

function App() {
  // 復習が必要な問題を数字で管理する、そのために問題を解くページには更新関数を与えてる
  const [reviewQuizzes, setReviewQuizzes] =
    useState<number[]>(reviewQuizzesIndex);

  const [QuizIndex, setQuizIndex] = useState<number>(0);

  // 利用するクイズのデータを保持
  const [quizzes, setQuizzes] = useState<Quiz[]>(quizData2.body);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PlayQuiz
              setReviewQuizzes={setReviewQuizzes}
              QuizIndex={QuizIndex}
              setQuizIndex={setQuizIndex}
              quizzes={quizzes}
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
          element={<PrepareQuiz quizzes={quizzes} />}
        />

        <Route
          path="/ChooseQuizData"
          // 全てのクイズのデータを渡して、選択させる
          element={
            <ChooseQuizData quizzes={allQuizzes} setQuizzes={setQuizzes} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
