// import { useState } from "react";
import { quizzes } from "../../../assets/quizzes";
import { Header } from "../../../components";
import ReviewQuiz from "./ReviewQuiz";
import "../style/reviewQuiz.css";

type ReviewQuizProps = {
  reviewQuizzesIndex: number[];
};

function ReviewQuizzes({ reviewQuizzesIndex }: ReviewQuizProps) {
  //   const deleteRandomQuiz = () => {
  //     const randomIndex = Math.floor(Math.random() * quizzes.length);
  //     setQuizzes((prevQuizzes) =>
  //       prevQuizzes.filter((_, index) => index !== randomIndex)
  //     );
  //   };

  const ReviewQuizList = reviewQuizzesIndex.map((index) => (
    <ReviewQuiz
      key={index}
      QuizName={quizzes[index].question}
      QuizAnswer={quizzes[index].answer}
    />
  ));

  return (
    <div>
      <Header HeaderTitle="Review" />
      <div className="ReviewQuizList">{ReviewQuizList}</div>
    </div>
  );
}

export default ReviewQuizzes;
