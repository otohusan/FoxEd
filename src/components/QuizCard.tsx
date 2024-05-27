import { useState } from "react";
import { useElementOnScreen } from "../hooks";
import "./style/quizCard.css";

type quizCardProps = { frontElement: string; backElement: string };

const QuizCard = (props: quizCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.85,
  });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`quiz-card ${isFlipped ? "is-flipped" : ""} ${
        isVisible ? "is-visible" : ""
      }`}
      onClick={handleClick}
    >
      <div className="quiz-card-inner" ref={containerRef}>
        <div className={`quiz-card-front ${isVisible ? "is-visible" : ""}`}>
          {props.frontElement}
        </div>
        <div className={`quiz-card-back ${isVisible ? "is-visible" : ""}`}>
          {props.backElement}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
