// ReviewQuizzesContext.ts
import { createContext, Dispatch, SetStateAction } from "react";

type ReviewQuiz = {
  // ... ここにReviewQuizの型定義を追加 ...
};

type ReviewQuizzesContextType = {
  reviewQuizzes: ReviewQuiz[];
  setReviewQuizzes: Dispatch<SetStateAction<ReviewQuiz[]>>;
};

// createContextに正しい型を設定する
const ReviewQuizzesContext = createContext<ReviewQuizzesContextType | null>(
  null
);

export default ReviewQuizzesContext;
