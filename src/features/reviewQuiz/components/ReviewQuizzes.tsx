// import { useState } from "react";
// import { quizzes } from "../../../assets/quizzes";
import { Header, Footer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { ReviewQuizType } from "../../../../type";
import ReviewQuiz from "./ReviewQuiz";
import "../style/reviewQuiz.css";

type ReviewQuizProps = {
  reviewQuizzes: ReviewQuizType[];
  setReviewQuizzes: React.Dispatch<React.SetStateAction<ReviewQuizType[]>>;
};

function ReviewQuizzes({ reviewQuizzes, setReviewQuizzes }: ReviewQuizProps) {
  // 復習からクイズを削除する関数
  const deleteReviewQuiz = (quizIndex: number) => {
    setReviewQuizzes((prevQuizzes) =>
      prevQuizzes.filter((_content, index) => index !== quizIndex)
    );
  };

  const navigate = useNavigate();

  const ReviewQuizList = reviewQuizzes.map((content, index) => (
    <ReviewQuiz
      key={index}
      QuizIndex={index}
      QuizName={content.question}
      QuizAnswer={content.answer}
      QuizPartOfSpeech={content.partOfSpeech}
      deleteReviewQuiz={deleteReviewQuiz}
    />
  ));

  return (
    <div>
      <Header HeaderTitle="Review" />
      <div
        onClick={() => {
          navigate("/");
        }}
        className="ReviewQuizBackQuizBtn"
      >
        ＜ クイズに戻る
      </div>
      <div className="ReviewQuizList">{ReviewQuizList}</div>
      <Footer />
    </div>
  );
}

export default ReviewQuizzes;
