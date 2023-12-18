import "../style/ChooseQuizContainer.css";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type QuizFormat = {
  label: string;
  body: Quiz[];
};

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
          {quizFormat.body.slice(0, 4).map((quiz) => (
            <div key={quiz.question} className="ChooseQuizContainerQuestion">
              {quiz.question}
            </div>
          ))}
          {/* 続きを示すための... */}
          ...
        </div>
      </div>
      <div className="ChooseQuizContainerOpen">開く</div>
    </div>
  );
}

export default ChooseQuizContainer;
