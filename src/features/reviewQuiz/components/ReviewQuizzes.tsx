// import { useState } from "react";
// import { quizzes } from "../../../assets/quizzes";
import { Header, Footer, HeadDataHelmet } from "../../../components";
import { useNavigate } from "react-router-dom";
import { ReviewQuizType } from "../../../../type";
import ReviewQuiz from "./ReviewQuiz";
import "../style/reviewQuiz.css";
import { Link } from "react-router-dom";

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

  const pageHeadDescription: string = `間違った英単語を復習することができる。見直しをして、苦手単語を克服しよう。`;
  return (
    <div>
      <HeadDataHelmet
        pageTitle="復習ページ"
        pageDescription={pageHeadDescription}
        pagePath="ReviewQuiz"
      />
      <Header HeaderTitle="Review" />
      <div className="ReviewQuizBackQuizBtn">
        <Link
          to={"/PlayQuiz"}
          onClick={() => {
            navigate("/PlayQuiz");
          }}
          className="ReviewQuizBackQuizLink"
        >
          ＜ クイズに戻る
        </Link>
      </div>
      <div className="ReviewQuizList">{ReviewQuizList}</div>
      <Footer />
    </div>
  );
}

export default ReviewQuizzes;
