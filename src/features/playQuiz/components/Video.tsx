import { useState } from "react";
import "../style/video.css"; // CSSをインポート
import { useVideo, useClickSide } from "../hooks";
import { StartVideoBtn, StopVideoBtn } from "./VideoBtn";
import QuizChoices from "./QuizChoices ";
import QuizWord from "./QuizWord";
import DarkOverlay from "./DarkOverlay";
import BreakTime from "./BreakTime";
import GoReviewBtn from "./GoReviewBtn";
import GoPrepareBtn from "./GoPrepareBtn";
import DisplayQuizNumber from "./DisplayQuizNumber";
// import { InformClickable } from "./InformClickable";
import { hideComponentForFixedTime } from "../api";
import { returnNextQuizIndex } from "../../../api";
import { Quiz, ReviewQuizType } from "../../../../type/index.ts";
import { HeadDataHelmet } from "../../../components/index.ts";
import allocateChoices from "../api/allocateChoices.ts";
import { Link } from "react-router-dom";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";

type VideoProps = {
  // 復習問題の管理
  setReviewQuizzes: React.Dispatch<React.SetStateAction<ReviewQuizType[]>>;
};

function Video({ setReviewQuizzes }: VideoProps) {
  // contextからクイズの情報を取り出す
  const { quizFormat, currentQuizIndex, setCurrentQuizIndex } =
    useQuizContext();
  const quizzes = quizFormat ? quizFormat.body : [];
  //解かれた問題の数を管理する
  const [solvedQuizzes, setSolvedQuizzes] = useState(0);
  const [isComponentsVisible, setIsComponentsVisible] = useState(true);

  //クリックされた画面の場所によって発動する関数を選べるフックを呼んでいる
  const { handleClick } = useClickSide({
    onLeftEdgeClick: () =>
      setCurrentQuizIndex(returnNextQuizIndex(currentQuizIndex, quizSize, -1)),
    onRightEdgeClick: () =>
      setCurrentQuizIndex(returnNextQuizIndex(currentQuizIndex, quizSize, 1)),
  });
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();

  // クイズが設定されてない場合と、少ない場合に表示する
  if (!quizzes || quizzes.length < 5) {
    return (
      <div className="video-text-error-container">
        <h2>問題数が5個より</h2>
        <h2>少ないから使えないよ</h2>
        <Link to={"/PrepareQuiz"}>フラッシュカード</Link>
        <span className="video-text-error">に</span>
        <br />
        <span className="video-text-error">戻って</span>
        <br />
        <span className="video-text-error">問題を追加しよう</span>
      </div>
    );
  }

  const quizSize: number = quizzes.length;
  // インデックスがクイズのサイズよりも大きい場合に対処
  if (currentQuizIndex >= quizSize) {
    setCurrentQuizIndex(0);
  }
  const quiz: Quiz = quizzes[currentQuizIndex];
  const questionWord: string = quiz.question;
  const answer: string = quiz.answer;
  const choices: string[] = allocateChoices(
    quizSize,
    currentQuizIndex,
    answer,
    quizzes
  );
  const partOfSpeech: number | undefined = quiz.partOfSpeech;

  // 休憩を入れることに関するコード
  const breakTimeDuration: number = 7000;
  const breakTimePerQuiz: number = 7;

  //ブレークタイムを入れるタイミングを図る
  if (solvedQuizzes === breakTimePerQuiz) {
    setSolvedQuizzes(0);
    hideComponentForFixedTime(breakTimeDuration, setIsComponentsVisible);
  }

  const pageHeadDescription =
    "Konwalk(コンウォーク)の歩きながら使える英単語帳です。日々の歩く時間を勉強する時間に変身させよう。";
  return (
    <div
      id="videoContainer"
      // クリック機能を割り当ててる
      onClick={handleClick}
    >
      <HeadDataHelmet
        pageTitle="クイズページ"
        pageDescription={pageHeadDescription}
        pagePath="PlayQuiz"
      />
      {/* ここにあるコンポーネントは常に表示される */}
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>
      <div
        className="videoBtn"
        onClick={isVideoPlaying ? stopVideo : startVideo}
      >
        {isVideoPlaying ? <StopVideoBtn /> : <StartVideoBtn />}
      </div>

      <DisplayQuizNumber
        currentQuizNumber={currentQuizIndex + 1}
        QuizLength={quizSize}
      />

      <GoReviewBtn stopVideo={stopVideo} />
      <GoPrepareBtn stopVideo={stopVideo} />

      {/* 起動した時だけ表示される、クリックできることをお知らせするコンポーネント */}
      {/* <InformClickable /> */}

      {/* 以下のコンポーネントはブレークタイムの時とプレイの時で表示するコンポーネントが変わる */}
      {isComponentsVisible ? (
        <div className="componentsWithPlaying">
          <DarkOverlay />
          <div>
            {/* 選択肢のボックスから、正解不正解を判定する関数を読んでるから、アンサーをこのコンポーネントに渡す */}
            <QuizChoices
              partOfSpeech={partOfSpeech}
              question={questionWord}
              choices={choices}
              answer={answer}
              setQuizIndex={setCurrentQuizIndex}
              quizSize={quizSize}
              quizIndex={currentQuizIndex}
              setSolvedQuizzes={setSolvedQuizzes}
              // 間違った問題を更新する関数
              setReviewQuizzes={setReviewQuizzes}
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
