import { Video } from "../features/playQuiz";
import { SetStateAction, Dispatch } from "react";
// import { Link } from "react-router-dom";

type PlayQuizProps = {
  // 復習問題を管理する
  setReviewQuizzes: Dispatch<SetStateAction<number[]>>;
  QuizIndex: number;
  setQuizIndex: Dispatch<SetStateAction<number>>;
};

function PlayQuiz({
  setReviewQuizzes,
  QuizIndex,
  setQuizIndex,
}: PlayQuizProps) {
  return (
    <div>
      <Video
        setReviewQuizzes={setReviewQuizzes}
        QuizIndex={QuizIndex}
        setQuizIndex={setQuizIndex}
      />
    </div>
  );
}

export default PlayQuiz;
