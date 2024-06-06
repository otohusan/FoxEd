import "../style/ChooseQuizContainer.css";
import { QuizFormat } from "../../../../type/index.ts";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import InfoBadge from "../../../components/InfoBadge.tsx";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";

type ChooseQuizContainerProps = {
  quizFormat: QuizFormat;
};

function ChooseQuizContainer({ quizFormat }: ChooseQuizContainerProps) {
  const { setQuizFormat } = useQuizContext();

  // iosのアドレスバーによる高さの変更を防ぐために、画面の高さをはじめに取得して固定する
  // CSSではそれを使う
  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--app-vh", `${vh}px`);
    };

    // 初期設定
    updateVH();
  }, []);

  return (
    <div className="ChooseQuizContainer">
      <div className="ChooseQuizContent">
        <div className="ChooseQuizLabel">{quizFormat.label}</div>
        {/* 収録単語数の表示 */}
        <InfoBadge
          text={`${quizFormat.body ? quizFormat.body.length : 0}用語`}
        />
      </div>
      <Link
        className="ChooseQuizContainerOpen"
        to={"/PrepareQuiz"}
        onClick={(e) => {
          e.preventDefault();
          setQuizFormat(quizFormat);
        }}
      >
        <div className="ChooseQuizContainerOpenSentence">覚える</div>
      </Link>
    </div>
  );
}

export default ChooseQuizContainer;
