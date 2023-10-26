import "../style/video.css"; // CSSをインポート
import { useVideo } from "../hooks";
import { StartVideoBtn, StopVideoBtn } from "./VideoBtn";
import QuizChoices from "./QuizChoices ";
import QuizWord from "./QuizWord";
import DarkOverlay from "./DarkOverlay";
import { quizzes } from "../../../assets/quizzes";
import { useState } from "react";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

function Video() {
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();
  const [QuizIndex, setQuizIndex] = useState(0);

  const quiz: Quiz = quizzes[QuizIndex];
  const questionWord: string = quiz.question;
  const choices: string[] = quiz.choices;
  const answer: string = quiz.answer;

  return (
    <div id="videoContainer">
      <DarkOverlay />

      <video ref={videoRef} autoPlay muted playsInline id="video"></video>

      <div
        className="videoBtn"
        onClick={isVideoPlaying ? stopVideo : startVideo}
      >
        {isVideoPlaying ? <StopVideoBtn /> : <StartVideoBtn />}
      </div>

      <div>
        {/* 選択肢のボックスから、正解不正解を判定する関数を読んでるから、アンサーをこのコンポーネントに渡す */}
        <QuizChoices
          choices={choices}
          answer={answer}
          setQuizIndex={setQuizIndex}
        />
      </div>

      <div>
        <QuizWord questionWord={questionWord} />
      </div>
    </div>
  );
}

export default Video;
