import "../style/PrepareQuiz.css";
import SpeakQuizWord from "../../playQuiz/components/SpeakQuizWordBtn";

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
        <div className="PrepareQuizSpeakBtn">
          <SpeakQuizWord questionWord={QuizName} />
        </div>
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
