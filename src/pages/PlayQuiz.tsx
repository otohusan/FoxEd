import { Video } from "../features/playQuiz";
import { SetStateAction, Dispatch } from "react";
// import { Link } from "react-router-dom";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type PlayQuizProps = {
  // 復習問題を管理する
  setReviewQuizzes: Dispatch<SetStateAction<number[]>>;
  QuizIndex: number;
  setQuizIndex: Dispatch<SetStateAction<number>>;
  quizzes: Quiz[];
};

function PlayQuiz({
  setReviewQuizzes,
  QuizIndex,
  setQuizIndex,
  quizzes,
}: PlayQuizProps) {
  return (
    <div>
      <Video
        setReviewQuizzes={setReviewQuizzes}
        QuizIndex={QuizIndex}
        setQuizIndex={setQuizIndex}
        quizzes={quizzes}
      />
    </div>
  );
}

export default PlayQuiz;
