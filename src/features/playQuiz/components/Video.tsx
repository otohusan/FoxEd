import { useState, useEffect } from "react";
import "../style/video.css"; // CSSをインポート
import { quizzes } from "../../../assets/quizzes";
import { useVideo } from "../hooks";
import { StartVideoBtn, StopVideoBtn } from "./VideoBtn";
import QuizChoices from "./QuizChoices ";
import QuizWord from "./QuizWord";
import DarkOverlay from "./DarkOverlay";
import BreakTime from "./BreakTime";
import { hideComponentForFixedTime } from "../api";

import useClickSide from "../hooks/useClickSide";
import { returnNextQuizIndex } from "../../../api";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

function Video() {
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();
  const [QuizIndex, setQuizIndex] = useState(0);
  const quizSize: number = quizzes.length;
  const quiz: Quiz = quizzes[QuizIndex];
  const questionWord: string = quiz.question;
  const choices: string[] = quiz.choices;
  const answer: string = quiz.answer;

  // 休憩を入れることに関するコード
  const breakTimeDuration: number = 1000;
  const breakTimePerQuiz: number = 7;
  const [isComponentsVisible, setIsComponentsVisible] = useState(true);

  const { handleClick } = useClickSide({
    onLeftEdgeClick: () =>
      setQuizIndex(returnNextQuizIndex(QuizIndex, quizSize, -1)),
    onRightEdgeClick: () =>
      setQuizIndex(returnNextQuizIndex(QuizIndex, quizSize, 1)),
  });

  //ブレークタイムを入れるタイミングを図る
  useEffect(() => {
    if (QuizIndex != 0 && QuizIndex % breakTimePerQuiz === 0) {
      hideComponentForFixedTime(breakTimeDuration, setIsComponentsVisible);
    }
  }, [QuizIndex]);

  return (
    <div
      id="videoContainer"
      // スワイプ機能を割り当ててる
      onClick={handleClick}
    >
      {/* ここにあるコンポーネントは常に表示される */}
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>
      <div
        className="videoBtn"
        onClick={isVideoPlaying ? stopVideo : startVideo}
      >
        {isVideoPlaying ? <StopVideoBtn /> : <StartVideoBtn />}
      </div>
      {/* 以下のコンポーネントはブレークタイムの時とプレイの時で表示するコンポーネントが変わる */}
      {isComponentsVisible ? (
        <div className="componentsWithPlaying">
          <DarkOverlay />
          <div>
            {/* 選択肢のボックスから、正解不正解を判定する関数を読んでるから、アンサーをこのコンポーネントに渡す */}
            <QuizChoices
              choices={choices}
              answer={answer}
              setQuizIndex={setQuizIndex}
              quizSize={quizSize}
              quizIndex={QuizIndex}
            />
          </div>
          <div>
            <QuizWord questionWord={questionWord} />
          </div>
        </div>
      ) : (
        <BreakTime />
      )}
    </div>
  );
}

export default Video;
