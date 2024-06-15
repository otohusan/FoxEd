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
        <div className="prepare-quiz-menus">
          {
            // オーナーだった場合のみ表示
            // NOTICE: 今だけこの条件
            isOwner && QuizID && (
              <OwnerQuizMenu
                QuizID={QuizID}
                prevQuestion={QuizName}
                prevAnswer={QuizAnswer}
              />
            )
          }
          <PrepareQuizMenu
            QuizName={QuizName}
            setCurrentQuizIndex={setCurrentQuizIndex}
            QuizIndex={QuizIndex}
          />
        </div>
      </div>
      <div className="PrepareQuizBorder"></div>
    </div>
  );
}

export default PrepareQuiz;
