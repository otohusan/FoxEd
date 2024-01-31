import "../style/ChooseQuizContainer.css";
import { MdArrowOutward } from "react-icons/md";
import { QuizFormat } from "../../../../type/index.ts";

type ChooseQuizContainerProps = {
  quizFormat: QuizFormat;
};

function ChooseQuizContainer({ quizFormat }: ChooseQuizContainerProps) {
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
        <div>Choose This Data</div>
        <div className="ChooseQuizContainerOpenMark">
          <MdArrowOutward />
        </div>
      </div>
    </div>
  );
}

export default ChooseQuizContainer;
