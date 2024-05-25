import { useState, useEffect } from "react";
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

type VideoProps = {
  // 復習問題の管理
  setReviewQuizzes: React.Dispatch<React.SetStateAction<ReviewQuizType[]>>;
  QuizIndex: number;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  quizzes: Quiz[];
};

function Video({
  setReviewQuizzes,
  QuizIndex,
  setQuizIndex,
  quizzes,
}: VideoProps) {
  function getRandomInt(min: number, max: number): number {
    // Math.random() は 0 以上 1 未満の浮動小数点の擬似乱数を返すため、
    // 最小値と最大倂との差を乗じ、最小値を足すことで目的の範囲を生成
    // Math.floor() を使用して整数に丸める
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = array.slice(); // 元の配列をコピーして新しい配列を作成
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  function allocateChoices(
    quizLength: number,
    quizIndex: number,
    quizTrueAnswer: string
  ): string[] {
    const res: string[] = [];
    res.push(quizTrueAnswer);

    while (res.length < 4) {
      const randomInt = getRandomInt(0, quizLength - 1);
      if (randomInt == quizIndex || res.includes(quizzes[randomInt].answer))
        continue; // 同じ回答が追加されないように

      res.push(quizzes[randomInt].answer);
    }

    return shuffleArray(res);
  }
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();
  // const [QuizIndex, setQuizIndex] = useState(0);
  const quizSize: number = quizzes.length;
  const quiz: Quiz = quizzes[QuizIndex];
  const questionWord: string = quiz.question;
  const answer: string = quiz.answer;
  const choices: string[] = allocateChoices(quizSize, QuizIndex, answer);
  const partOfSpeech: number = quiz.partOfSpeech;

  // 休憩を入れることに関するコード
  const breakTimeDuration: number = 7000;
  const breakTimePerQuiz: number = 7;
  //解かれた問題の数を管理する
  const [solvedQuizzes, setSolvedQuizzes] = useState(0);
  const [isComponentsVisible, setIsComponentsVisible] = useState(true);

  //クリックされた画面の場所によって発動する関数を選べるフックを呼んでいる
  const { handleClick } = useClickSide({
    onLeftEdgeClick: () =>
      setQuizIndex(returnNextQuizIndex(QuizIndex, quizSize, -1)),
    onRightEdgeClick: () =>
      setQuizIndex(returnNextQuizIndex(QuizIndex, quizSize, 1)),
  });

  //ブレークタイムを入れるタイミングを図る
  useEffect(() => {
    if (solvedQuizzes === breakTimePerQuiz) {
      setSolvedQuizzes(0);
      hideComponentForFixedTime(breakTimeDuration, setIsComponentsVisible);
    }
  }, [solvedQuizzes]);

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
        currentQuizNumber={QuizIndex + 1}
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
              setQuizIndex={setQuizIndex}
              quizSize={quizSize}
              quizIndex={QuizIndex}
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
