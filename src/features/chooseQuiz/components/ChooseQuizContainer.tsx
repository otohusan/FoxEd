import "../style/ChooseQuizContainer.css";
import { QuizFormat } from "../../../../type/index.ts";
import { Link } from "react-router-dom";
import InfoBadge from "../../../components/InfoBadge.tsx";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";

type ChooseQuizContainerProps = {
  quizFormat: QuizFormat;
};

function ChooseQuizContainer({ quizFormat }: ChooseQuizContainerProps) {
  const { setQuizFormat } = useQuizContext();

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
