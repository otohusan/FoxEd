import { useState } from "react";
import { useElementOnScreen } from "../hooks";
import "./style/quizCard.css";
import { useColorModeContext } from "./colorMode/useColorModeContext";
import { FiEdit2 } from "react-icons/fi";

type quizCardProps = {
  id?: string;
  frontElement: string;
  backElement: string;
  isOwner?: boolean;
  handleClickMenu?: (
    e: React.MouseEvent,
    quiz: { id: string; question: string; answer: string }
  ) => void;
  backgroundColor?: string;
  textColor?: string;
  borderStyle?: string;
  textShadow?: string;
};

const QuizCard = (props: quizCardProps) => {
  const { isDarkMode } = useColorModeContext();
  const {
    id,
    frontElement,
    backElement,
    isOwner,
    handleClickMenu,
    backgroundColor = isDarkMode ? "#635952" : "#fcfcfc", // デフォルトの背景色
    textColor = isDarkMode ? "#eee9e4" : "#333333", // デフォルトの文字色
    borderStyle = "",
    textShadow = "",
  } = props;

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
          style={{
            backgroundColor: backgroundColor,
            border: borderStyle,
            color: textColor,
          }}
        >
          {isFlipped ? (
            <p
              className="quiz-card-back-element"
              style={{ textShadow: textShadow }}
            >
              {backElement}
            </p>
          ) : (
            <p
              className="quiz-card-front-element"
              style={{ textShadow: textShadow }}
            >
              {frontElement}
            </p>
          )}
        </div>
        {id && isOwner && handleClickMenu !== undefined && (
          <button
            onClick={(e) => {
              handleClickMenu(e, {
                id: id,
                question: frontElement,
                answer: backElement,
              });
            }}
            className={`quiz-card-edit-btn ${isFlipped ? "is-flipped" : ""}`}
          >
            <FiEdit2 size={"20px"} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
