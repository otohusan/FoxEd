import "../style/PrepareQuiz.css";
import PrepareQuizMenu from "./PrepareQuizMenu";

type PrepareQuizProps = {
  QuizName: string;
  QuizAnswer: string;
};

function PrepareQuiz({ QuizName, QuizAnswer }: PrepareQuizProps) {
  return (
    <div className="PrepareQuizContainer">
      <div className="PrepareQuizContent">
        <div className="PrepareQuizName">{QuizName}</div>
        <div className="PrepareQuizAnswer">{QuizAnswer}</div>
        <PrepareQuizMenu QuizName={QuizName} />
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
