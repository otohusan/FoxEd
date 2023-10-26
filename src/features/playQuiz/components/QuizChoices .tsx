import ChoiceBox from "./ChoiceBox ";
import "../style/quizChoices.css";
import Feedback from "./Feedback";
import useFeedback from "../hooks/useFeedBack";

function QuizChoices() {
  const times = [1, 2, 3, 4];
  const { FeedbackRef, feedbackFunc } = useFeedback();

  return (
    <>
      <div className="quizChoices">
        {times.map((_, index) => (
          <ChoiceBox key={index} feedbackFunc={feedbackFunc} />
        ))}
      </div>
      <Feedback myDivRef={FeedbackRef} feedbackValue="saa" />
    </>
  );
}

export default QuizChoices;
