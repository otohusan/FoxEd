import "../style/ChooseQuizContainer.css";
import { MdArrowOutward } from "react-icons/md";
import { QuizFormat } from "../../../../type/index.ts";
import { useEffect } from "react";

type ChooseQuizContainerProps = {
  quizFormat: QuizFormat;
};

function ChooseQuizContainer({ quizFormat }: ChooseQuizContainerProps) {
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
        {/* 一覧の時に表示する単語を限定 */}
        <div className="ChooseQuizContainerQuestions">
          {quizFormat.body.slice(0, 15).map((quiz) => (
            <div key={quiz.question} className="ChooseQuizContainerQuestion">
              {quiz.question}
            </div>
          ))}
          {/* 続きを示すための... */}
          ...
        </div>
        {/* 収録単語数の表示 */}
        <div className="ChooseQuizWordsNumbers">
          収録数: {quizFormat.body.length} Words
        </div>
      </div>
      <div className="ChooseQuizContainerOpen">
        <div>この単語を覚える</div>
        <div className="ChooseQuizContainerOpenMark">
          <MdArrowOutward />
        </div>
      </div>
    </div>
  );
}

export default ChooseQuizContainer;
