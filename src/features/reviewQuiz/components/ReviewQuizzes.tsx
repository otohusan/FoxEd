// import { useState } from "react";
import { quizzes } from "../../../assets/quizzes";
import { Header } from "../../../components";
import ReviewQuiz from "./ReviewQuiz";
import "../style/reviewQuiz.css";
import { useNavigate } from "react-router-dom";

type ReviewQuizProps = {
  reviewQuizzesIndex: number[];
  setReviewQuizzesIndex: React.Dispatch<React.SetStateAction<number[]>>;
};

function ReviewQuizzes({
  reviewQuizzesIndex,
  setReviewQuizzesIndex,
}: ReviewQuizProps) {
  // 復習からクイズを削除する関数
  const deleteReviewQuiz = (quizIndex: number) => {
    setReviewQuizzesIndex((prevQuizzes) =>
      prevQuizzes.filter((index) => index !== quizIndex)
    );
  };

  const navigate = useNavigate();

  const ReviewQuizList = reviewQuizzesIndex.map((index) => (
    <ReviewQuiz
      key={index}
      QuizIndex={index}
      QuizName={quizzes[index].question}
      QuizAnswer={quizzes[index].answer}
      deleteReviewQuiz={deleteReviewQuiz}
    />
  ));

  return (
    <div>
      <Header HeaderTitle="Review" />
      <div className="ReviewQuizList">{ReviewQuizList}</div>
      <div
        onClick={() => {
          navigate("/");
        }}
        className="ReviewQuizBackQuizBtn"
      >
        クイズに戻る
      </div>
    </div>
  );
}

export default ReviewQuizzes;
