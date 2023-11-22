import { ReviewQuizzes } from "../features/reviewQuiz";

type ReviewQuizProps = {
  reviewQuizzes: number[];
};

function ReviewQuiz({ reviewQuizzes }: ReviewQuizProps) {
  return (
    <>
      <ReviewQuizzes reviewQuizzesIndex={reviewQuizzes} />
    </>
  );
}

export default ReviewQuiz;
