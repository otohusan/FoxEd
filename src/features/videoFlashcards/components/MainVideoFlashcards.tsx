import { useEffect } from "react";
import { HeadDataHelmet, QuizCard } from "../../../components";
import HorizontalScroll from "../../../components/HorizontalScroll";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import {
  StopVideoBtn,
  StartVideoBtn,
} from "../../playQuiz/components/VideoBtn";
import { useVideo } from "../../playQuiz/hooks";
import "../style/MainVideoFlashcards.css";

function MainVideoFlashcards() {
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();

  const { quizFormat } = useQuizContext();
  const quizzes = quizFormat ? quizFormat.body : [];

  useEffect(() => {
    return () => {
      stopVideo(); // コンポーネントがアンマウントされるときにstopVideoを呼び出す
    };
  }, [stopVideo]);

  const cardList =
    quizzes &&
    quizzes.map((quiz, index) => (
      <QuizCard
        frontElement={quiz.question}
        backElement={quiz.answer}
        key={index}
        backgroundColor="rgba(0, 0, 0, 0.1)"
        borderStyle="2px solid rgba(255, 255, 255)"
        textColor="rgb(255, 255, 255)"
        textShadow="0px 0px 5px rgba(0, 0, 0, 0.7)"
      />
    ));

  return (
    <div id="video-flashcards-container">
      <HeadDataHelmet pageTitle="ビデオフラッシュカード" />
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>
      <div
        className="video-flashcards-btn"
        onClick={isVideoPlaying ? stopVideo : startVideo}
      >
        {isVideoPlaying ? <StopVideoBtn /> : <StartVideoBtn />}
      </div>

      <div className="video-flashcards-card-list">
        {quizzes && quizzes.length != 0 && (
          <HorizontalScroll>{cardList}</HorizontalScroll>
        )}
      </div>
    </div>
  );
}

export default MainVideoFlashcards;
