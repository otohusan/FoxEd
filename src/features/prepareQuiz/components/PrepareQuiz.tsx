import "../style/PrepareQuiz.css";
import PrepareQuizMenu from "./PrepareQuizMenu";
import { partOfSpeechTable } from "../../../assets/partOfSpeechTable";
import OwnerQuizMenu from "./OwnerQuizMenu";

type PrepareQuizProps = {
  QuizID?: string;
  QuizName: string;
  QuizAnswer: string;
  QuizPartOfSpeech?: number | undefined;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  QuizIndex: number;
  isOwner: boolean;
};

function PrepareQuiz({
  QuizID,
  QuizName,
  QuizAnswer,
  QuizPartOfSpeech,
  setCurrentQuizIndex,
  QuizIndex,
  isOwner,
}: PrepareQuizProps) {
  return (
    <div className="PrepareQuizContainer">
      <div className="PrepareQuizContent">
        <div className="PrepareQuizName">{QuizName}</div>
        <div className="PrepareQuizPartOfSpeechAndAnswer">
          <div className="PrepareQuizPartOfSpeechContainer">
            <div className="PrepareQuizPartOfSpeech">
              {QuizPartOfSpeech
                ? partOfSpeechTable[QuizPartOfSpeech - 1]
                : partOfSpeechTable[7]}
            </div>
          </div>
          <div className="PrepareQuizAnswer">{QuizAnswer}</div>
        </div>
        <PrepareQuizMenu
          QuizName={QuizName}
          setCurrentQuizIndex={setCurrentQuizIndex}
          QuizIndex={QuizIndex}
        />
        {isOwner && QuizID && <OwnerQuizMenu QuizID={QuizID} />}
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
