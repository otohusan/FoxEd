import "../style/PrepareQuiz.css";
import PrepareQuizMenu from "./PrepareQuizMenu";
import { partOfSpeechTable } from "../../../assets/partOfSpeechTable";

type PrepareQuizProps = {
  QuizName: string;
  QuizAnswer: string;
  QuizPartOfSpeech: number;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  QuizIndex: number;
};

function PrepareQuiz({
  QuizName,
  QuizAnswer,
  QuizPartOfSpeech,
  setCurrentQuizIndex,
  QuizIndex,
}: PrepareQuizProps) {
  return (
    <div className="PrepareQuizContainer">
      <div className="PrepareQuizContent">
        <div className="PrepareQuizName">{QuizName}</div>
        <div className="PrepareQuizPartOfSpeechAndAnswer">
          <div className="PrepareQuizPartOfSpeechContainer">
            <div className="PrepareQuizPartOfSpeech">
              {partOfSpeechTable[QuizPartOfSpeech - 1]}
            </div>
          </div>
          <div className="PrepareQuizAnswer">{QuizAnswer}</div>
        </div>
        <PrepareQuizMenu
          QuizName={QuizName}
          setCurrentQuizIndex={setCurrentQuizIndex}
          QuizIndex={QuizIndex}
        />
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
