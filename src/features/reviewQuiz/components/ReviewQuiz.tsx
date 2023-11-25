import "../style/reviewQuiz.css";
import { MdOutlineDelete } from "react-icons/md";

type ReviewQuizProps = {
  QuizIndex: number;
  QuizName: string;
  QuizAnswer: string;
  deleteReviewQuiz: (quizIndex: number) => void;
};

function ReviewQuiz({
  QuizIndex,
  QuizName,
  QuizAnswer,
  deleteReviewQuiz,
}: ReviewQuizProps) {
  return (
    <div className="ReviewQuizContainer">
      <div className="ReviewQuizContent">
        <div className="ReviewQuizName">{QuizName}</div>
        <div className="ReviewQuizAnswer">{QuizAnswer}</div>
        <div
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
        </div>
      </div>
      <div className="ReviewQuizBorder"></div>
    </div>
  );
}

export default ReviewQuiz;
