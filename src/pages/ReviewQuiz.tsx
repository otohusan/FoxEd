import { ReviewQuizzes } from "../features/reviewQuiz";

type ReviewQuizProps = {
  reviewQuizzes: number[];
  setReviewQuizzes: React.Dispatch<React.SetStateAction<number[]>>;
};

function ReviewQuiz({ reviewQuizzes, setReviewQuizzes }: ReviewQuizProps) {
  return (
    <>
      <ReviewQuizzes
        reviewQuizzesIndex={reviewQuizzes}
        setReviewQuizzesIndex={setReviewQuizzes}
      />
    </>
  );
}

export default ReviewQuiz;
