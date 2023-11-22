import "../style/reviewQuiz.css";

type ReviewQuizProps = {
  QuizName: string;
  QuizAnswer: string;
};

function ReviewQuiz({ QuizName, QuizAnswer }: ReviewQuizProps) {
  return (
    <div className="ReviewQuizContainer">
      <div className="ReviewQuizContent">
        <div className="ReviewQuizName">{QuizName}</div>
        <div className="ReviewQuizAnswer">{QuizAnswer}</div>
      </div>
      <div className="ReviewQuizBorder"></div>
    </div>
  );
}

export default ReviewQuiz;
