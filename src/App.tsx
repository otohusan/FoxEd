import "./App.css";
import { Suspense, lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { reviewQuizInitialValue } from "./assets/reviewQuizzes";
import { allQuizzes } from "./assets/allQuizData";
import { quizData2 } from "./assets/quizData2";
import { QuizFormat, ReviewQuizType } from "../type/index.ts";
import BottomNavigation from "./components/BottomNavigation.tsx";
import Loading from "./components/Loading.tsx";

// import { HelmetProvider } from "react-helmet-async";

// Lazy load the components
const PlayQuiz = lazy(() => import("./pages/PlayQuiz"));
const ReviewQuiz = lazy(() => import("./pages/ReviewQuiz"));
const PrepareQuiz = lazy(() => import("./pages/PrepareQuiz"));
const ChooseQuizData = lazy(() => import("./pages/ChooseQuizData"));
const Login = lazy(() => import("./pages/Login"));

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
      <Suspense fallback={<Loading />}>
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

          <Route path="/PrepareQuiz" element={<PrepareQuiz />} />

          <Route
            path="/"
            // 全てのクイズのデータを渡して、選択させる
            element={<ChooseQuizData quizzes={allQuizzes} />}
          />

          <Route path="/Login" element={<Login />} />
        </Routes>
      </Suspense>

      <BottomNavigation />
      {/* </HelmetProvider> */}
    </>
  );
}

export default App;
