import "../style/PrepareQuiz.css";
import "../style/PrepareMenus.css";
import SpeakWordBtn from "./SpeakWordBtn";

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
        <div className="PrepareMenus">
          <div className="PrepareQuizSpeakBtn">
            <SpeakWordBtn questionWord={QuizName} />
          </div>
          <div className="PrepareQuizMenu">...</div>
        </div>
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
