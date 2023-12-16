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
      <div>{quizFormat.label}</div>
      {/* 一覧の時に表示する単語を限定 */}
      <div className="ChooseQuizContainerQuestion">
        {quizFormat.body.slice(0, 4).map((quiz) => (
          <div key={quiz.question}>{quiz.question}</div>
        ))}
      </div>
    </div>
  );
}

export default ChooseQuizContainer;
