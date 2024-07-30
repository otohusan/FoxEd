import "./App.css";
import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { reviewQuizInitialValue } from "./assets/reviewQuizzes";
import { ReviewQuizType } from "../type/index.ts";
import BottomNavigation from "./components/BottomNavigation.tsx";
import Loading from "./components/Loading.tsx";
import useScrollRestoration from "./hooks/useScrollRestoration.ts";

// Lazy load the components
const PlayQuiz = lazy(() => import("./pages/PlayQuiz"));
const ReviewQuiz = lazy(() => import("./pages/ReviewQuiz"));
const PrepareQuiz = lazy(() => import("./pages/PrepareQuiz"));
const ChooseQuizData = lazy(() => import("./pages/ChooseQuizData"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));
const Register = lazy(() => import("./pages/Register"));
const Search = lazy(() => import("./pages/Search"));
const ApplicationPrivacy = lazy(() => import("./pages/ApplicationPrivacy"));
const ApplicationTerms = lazy(() => import("./pages/ApplicationTerms.tsx"));
const ApplicationContact = lazy(() => import("./pages/ApplicationContact.tsx"));
const VideoFlashcards = lazy(() => import("./pages/VideoFlashcards.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));

function App() {
  // 復習が必要な問題を数字で管理する、そのために問題を解くページには更新関数を与えてる
  const [reviewQuizzes, setReviewQuizzes] = useState<ReviewQuizType[]>(
    reviewQuizInitialValue
  );

  useScrollRestoration();

  return (
    <>
      {/* <HelmetProvider> */}
      {/* lazy importを行なってるから、更新時はこれを表示 */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/VideoFlashcards"
            element={<PlayQuiz setReviewQuizzes={setReviewQuizzes} />}
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
            element={<ChooseQuizData />}
          />

          <Route path="/Login" element={<Login />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/ApplicationPrivacy" element={<ApplicationPrivacy />} />
          <Route path="/ApplicationTerms" element={<ApplicationTerms />} />
          <Route path="/ApplicationContact" element={<ApplicationContact />} />
          <Route path="/PlayQuiz" element={<VideoFlashcards />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </Suspense>

      <BottomNavigation />
      {/* </HelmetProvider> */}
    </>
  );
}

export default App;
