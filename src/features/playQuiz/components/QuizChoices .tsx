import ChoiceBox from "./ChoiceBox ";
import "../style/quizChoices.css";
import Feedback from "./Feedback";
import useFeedback from "../hooks/useFeedBack";

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

  return (
    <>
      <div className="quizChoices">
        {choices.map((choiceValue, index) => (
          // ChoiceBoxコンポーネントで正解不正解の判定を行うから、答えと関数を渡す
          //次のクイズに更新する関数も渡している
          <ChoiceBox
            key={index}
            feedbackFunc={feedbackFunc}
            choiceValue={choiceValue}
            answer={answer}
            setQuizIndex={setQuizIndex}
            quizSize={quizSize}
            quizIndex={quizIndex}
          />
        ))}
      </div>
      <Feedback myDivRef={FeedbackRef} />
    </>
  );
}

export default QuizChoices;
