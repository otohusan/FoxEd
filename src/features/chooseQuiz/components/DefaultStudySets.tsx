// DefaultStudySets.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ChooseQuizContainer from "./ChooseQuizContainer";
import { QuizFormat } from "../../../../type/index.ts";
import "../style/ChooseQuizContainer.css";
import { quizzes as yumetan } from "../../../assets/quizzes.ts";
import { allQuizzes as quizzes } from "../../../assets/allQuizData.ts";

type DefaultStudySetsProps = {
  setQuizFormat: (quizFormat: QuizFormat) => void;
};

const DefaultStudySets: React.FC<DefaultStudySetsProps> = ({
  setQuizFormat,
}) => {
  const navigate = useNavigate();

  const handleClick = (quizFormat: QuizFormat) => {
    setQuizFormat(quizFormat);
    navigate("/PrepareQuiz");
  };

  return (
    <>
      <div className="ChooseQuizListTitle">TOEIC英単語</div>
      <div className="ChooseQuizDataList">
        {quizzes.map((quizFormat, index) => (
          <div
            key={index}
            onClick={() => handleClick(quizFormat)}
            className="ChooseQuizContainerWrapper"
          >
            <ChooseQuizContainer quizFormat={quizFormat} />
          </div>
        ))}
      </div>

      <div className="ChooseQuizListTitleKoukou">高校英単語</div>
      <div className="ChooseQuizDataList">
        {yumetan.map((quizFormat, index) => (
          <div
            key={index}
            onClick={() => handleClick(quizFormat)}
            className="ChooseQuizContainerWrapper"
          >
            <ChooseQuizContainer quizFormat={quizFormat} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DefaultStudySets;
