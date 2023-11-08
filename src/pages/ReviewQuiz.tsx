import { ReviewQuizzes } from "../features/reviewQuiz";
// import { Link } from "react-router-dom";

type ReviewQuizProps = {
  reviewQuizzes: number[];
};

function ReviewQuiz({ reviewQuizzes }: ReviewQuizProps) {
  return (
    <>
      <ReviewQuizzes reviewQuizzes1={reviewQuizzes} />
    </>
  );
}

export default ReviewQuiz;
