import ChoiceBox from "./ChoiceBox ";
import "../style/quizChoices.css";

function QuizChoices() {
  const times = [1, 2, 3, 4];

  return (
    <div className="quizChoices">
      {times.map((_, index) => (
        <ChoiceBox key={index} />
      ))}
    </div>
  );
}

export default QuizChoices;
