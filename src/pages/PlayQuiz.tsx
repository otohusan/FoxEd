import { Video } from "../features/playQuiz";
import { SetStateAction, Dispatch } from "react";
// import { Link } from "react-router-dom";

type PlayQuizProps = {
  // 復習問題を管理する
  setReviewQuizzes: Dispatch<SetStateAction<number[]>>;
};

function PlayQuiz({ setReviewQuizzes }: PlayQuizProps) {
  return (
    <div>
      <Video />
    </div>
  );
}

export default PlayQuiz;
