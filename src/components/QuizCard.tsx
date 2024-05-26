import { useState } from "react";
import "./style/quizCard.css";
import React from "react";

type quizCardProps = { frontElement: string; backElement: string };

const QuizCard = (props: quizCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`quiz-card ${isFlipped ? "is-flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="quiz-card-inner">
        <div className="quiz-card-front">{props.frontElement}</div>
        <div className="quiz-card-back">{props.backElement}</div>
      </div>
    </div>
  );
};

export default QuizCard;
