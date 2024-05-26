import ChoiceBox from "./ChoiceBox ";
import "../style/quizChoices.css";
import Feedback from "./Feedback";
import useFeedback from "../hooks/useFeedBack";
import { useState } from "react";
import { ReviewQuizType } from "../../../../type";

interface QuizChoicesProps {
  question: string;
  choices: string[];
  partOfSpeech: number | undefined;
  answer: string;
  quizSize: number;
  quizIndex: number;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  setSolvedQuizzes: React.Dispatch<React.SetStateAction<number>>;
  // 間違った問題の更新
  setReviewQuizzes: React.Dispatch<React.SetStateAction<ReviewQuizType[]>>;
}

function QuizChoices({
  question,
  choices,
  partOfSpeech,
  answer,
  setQuizIndex,
  setSolvedQuizzes,
  quizSize,
  quizIndex,
  setReviewQuizzes,
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
            key={choiceValue}
          >
            <ChoiceBox
              question={question}
              partOfSpeech={partOfSpeech}
              key={index}
              feedbackFunc={feedbackFunc}
              choiceValue={choiceValue}
              answer={answer}
              setQuizIndex={setQuizIndex}
              setSolvedQuizzes={setSolvedQuizzes}
              setWithinAnswer={setWithinAnswer}
              quizSize={quizSize}
              quizIndex={quizIndex}
              setReviewQuizzes={setReviewQuizzes}
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
