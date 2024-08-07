import "../style/PrepareQuiz.css";
import PrepareQuizMenu from "./PrepareQuizMenu";
// import { partOfSpeechTable } from "../../../assets/partOfSpeechTable";
// import OwnerQuizMenu from "./OwnerQuizMenu";

type PrepareQuizProps = {
  QuizID?: string;
  QuizName: string;
  QuizAnswer: string;
  QuizPartOfSpeech?: number | undefined;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  QuizIndex: number;
  isOwner: boolean;
  handleClickMenu: (
    e: React.MouseEvent,
    quiz: { id: string; question: string; answer: string }
  ) => void;
};

function PrepareQuiz({
  QuizID,
  QuizName,
  QuizAnswer,
  // QuizPartOfSpeech,
  setCurrentQuizIndex,
  QuizIndex,
  isOwner,
  handleClickMenu,
}: PrepareQuizProps) {
  return (
    <div className="PrepareQuizContainer">
      <div className="PrepareQuizContent">
        <div className="PrepareQuizName">{QuizName}</div>
        <div className="PrepareQuizPartOfSpeechAndAnswer">
          {/* <div className="PrepareQuizPartOfSpeechContainer">
            <div className="PrepareQuizPartOfSpeech">
              {QuizPartOfSpeech
                ? partOfSpeechTable[QuizPartOfSpeech - 1]
                : partOfSpeechTable[7]}
            </div>
          </div> */}
          <div className="PrepareQuizAnswer">{QuizAnswer}</div>
        </div>
        <div className="prepare-quiz-menus">
          <PrepareQuizMenu
            isOwner={isOwner}
            QuizID={QuizID}
            QuizAnswer={QuizAnswer}
            QuizName={QuizName}
            setCurrentQuizIndex={setCurrentQuizIndex}
            QuizIndex={QuizIndex}
            handleClickMenu={handleClickMenu}
          />
        </div>
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
