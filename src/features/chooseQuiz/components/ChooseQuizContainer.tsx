import "../style/ChooseQuizContainer.css";
import { QuizFormat } from "../../../../type/index.ts";
// import { Link } from "react-router-dom";
import InfoBadge from "../../../components/InfoBadge.tsx";
// import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";

type ChooseQuizContainerProps = {
  quizFormat: QuizFormat;
};

function ChooseQuizContainer({ quizFormat }: ChooseQuizContainerProps) {
  return (
    <div className="ChooseQuizContainer">
      <div className="ChooseQuizContent">
        <a className="ChooseQuizLabel">{quizFormat.label}</a>
        {/* 収録単語数の表示 */}
        <div>
          <InfoBadge
            text={`${quizFormat.body ? quizFormat.body.length : 0}用語`}
          />
        </div>
      </div>
    </div>
  );
}

export default ChooseQuizContainer;
