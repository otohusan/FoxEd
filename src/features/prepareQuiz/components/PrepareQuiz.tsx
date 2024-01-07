import "../style/PrepareQuiz.css";
import PrepareQuizMenu from "./PrepareQuizMenu";

type PrepareQuizProps = {
  QuizName: string;
  QuizAnswer: string;
  QuizPartOfSpeech: number;
};

function PrepareQuiz({
  QuizName,
  QuizAnswer,
  QuizPartOfSpeech,
}: PrepareQuizProps) {
  return (
    <div className="PrepareQuizContainer">
      <div className="PrepareQuizContent">
        <div className="PrepareQuizName">{QuizName}</div>
        <div className="PrepareQuizPartOfSpeechAndAnswer">
          <div className="PrepareQuizPartOfSpeechContainer">
            <div className="PrepareQuizPartOfSpeech">{QuizPartOfSpeech}</div>
          </div>
          <div className="PrepareQuizAnswer">{QuizAnswer}</div>
        </div>
        <PrepareQuizMenu QuizName={QuizName} />
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
