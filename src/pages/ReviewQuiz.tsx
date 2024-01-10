import { ReviewQuizzes } from "../features/reviewQuiz";
import { ReviewQuizType } from "../../type";

type ReviewQuizProps = {
  reviewQuizzes: ReviewQuizType[];
  setReviewQuizzes: React.Dispatch<React.SetStateAction<ReviewQuizType[]>>;
};

function ReviewQuiz({ reviewQuizzes, setReviewQuizzes }: ReviewQuizProps) {
  return (
    <>
      <ReviewQuizzes
        reviewQuizzes={reviewQuizzes}
        setReviewQuizzes={setReviewQuizzes}
      />
    </>
  );
}

export default ReviewQuiz;
