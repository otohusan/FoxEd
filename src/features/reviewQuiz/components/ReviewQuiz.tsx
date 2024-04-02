import "../style/reviewQuiz.css";
import { MdOutlineDelete } from "react-icons/md";
import { partOfSpeechTable } from "../../../assets/partOfSpeechTable";

type ReviewQuizProps = {
  QuizIndex: number;
  QuizName: string;
  QuizAnswer: string;
  QuizPartOfSpeech: number;
  deleteReviewQuiz: (quizIndex: number) => void;
};

function ReviewQuiz({
  QuizIndex,
  QuizName,
  QuizAnswer,
  QuizPartOfSpeech,
  deleteReviewQuiz,
}: ReviewQuizProps) {
  return (
    <div className="ReviewQuizContainer">
      <div className="ReviewQuizContent">
        <div className="ReviewQuizName">{QuizName}</div>
        <div className="ReviewQuizPartOfSpeechAndAnswer">
          <div className="ReviewQuizPartOfSpeechContainer">
            <div className="ReviewQuizPartOfSpeech">
              {partOfSpeechTable[QuizPartOfSpeech - 1]}
            </div>
          </div>
          <div className="ReviewQuizAnswer">{QuizAnswer}</div>
        </div>
        <button
          className="ReviewQuizDeleteBtn"
          onClick={() => {
            deleteReviewQuiz(QuizIndex);
          }}
        >
          <MdOutlineDelete
            size={20}
            style={{
              filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))",
            }}
          />
        </button>
      </div>
      <div className="ReviewQuizBorder"></div>
    </div>
  );
}

export default ReviewQuiz;
