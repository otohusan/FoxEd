import "../style/displayQuizNumber.css";

type DisplayQuizNumberProps = {
  currentQuizNumber: number;
  QuizLength: number;
};

function DisplayQuizNumber({
  currentQuizNumber,
  QuizLength,
}: DisplayQuizNumberProps) {
  return (
    <div className="displayQuizNumber">
      {currentQuizNumber} / {QuizLength}
    </div>
  );
}

export default DisplayQuizNumber;
