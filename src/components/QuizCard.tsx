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
      ref={containerRef}
    >
      <div className="quiz-card-inner">
        <div
          className={`quiz-card-front ${isFlipped ? "is-flipped" : ""} ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {isFlipped ? (
            <p className="quiz-card-back-element">{props.backElement}</p>
          ) : (
            <p className="quiz-card-front-element">{props.frontElement}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
