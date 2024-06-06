import { Video } from "../features/playQuiz";
import { SetStateAction, Dispatch } from "react";
import { ReviewQuizType } from "../../type/index.ts";

type PlayQuizProps = {
  // 復習問題を管理する
  setReviewQuizzes: Dispatch<SetStateAction<ReviewQuizType[]>>;
};

function PlayQuiz({ setReviewQuizzes }: PlayQuizProps) {
  return (
    <div>
      <Video setReviewQuizzes={setReviewQuizzes} />
    </div>
  );
}

export default PlayQuiz;
