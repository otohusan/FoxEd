import "../style/reviewQuiz.css";

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
          delete this
        </div>
      </div>
      <div className="ReviewQuizBorder"></div>
    </div>
  );
}

export default ReviewQuiz;
