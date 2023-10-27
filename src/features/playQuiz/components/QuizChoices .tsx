import ChoiceBox from "./ChoiceBox ";
import "../style/quizChoices.css";
import Feedback from "./Feedback";
import useFeedback from "../hooks/useFeedBack";
import { useState } from "react";

interface QuizChoicesProps {
  choices: string[];
  answer: string;
  quizSize: number;
  quizIndex: number;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
}

function QuizChoices({
  choices,
  answer,
  setQuizIndex,
  quizSize,
  quizIndex,
}: QuizChoicesProps) {
  const { FeedbackRef, feedbackFunc } = useFeedback();
  //選択肢かフィードバックのどちらを表示するかを制御するState
  const [withinAnswer, setWithinAnswer] = useState(true);

  return (
    <>
      <div className="quizChoices">
        {choices.map((choiceValue, index) => (
          // ChoiceBoxコンポーネントで正解不正解の判定を行うから、答えと関数を渡す
          //次のクイズに更新する関数も渡している
          <div
            style={{ display: withinAnswer ? "block" : "none" }}
            className="choiceBoxBehavior"
          >
            <ChoiceBox
              key={index}
              feedbackFunc={feedbackFunc}
              choiceValue={choiceValue}
              answer={answer}
              setQuizIndex={setQuizIndex}
              setWithinAnswer={setWithinAnswer}
              quizSize={quizSize}
              quizIndex={quizIndex}
            />
          </div>
        ))}
      </div>
      <div style={{ display: withinAnswer ? "none" : "block" }}>
        <Feedback myDivRef={FeedbackRef} />
      </div>
    </>
  );
}

export default QuizChoices;
