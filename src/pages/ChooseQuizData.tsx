type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type QuizFormat = {
  label: string;
  body: Quiz[];
};

type ChooseQuizDataProps = {
  quizzes: QuizFormat[];
};

function ChooseQuizData({ quizzes }: ChooseQuizDataProps) {
  return (
    <div style={{ color: "black" }}>
      {quizzes.map((quizFormat, index) => (
        <div key={index}>
          <h2>{quizFormat.label}</h2>
        </div>
      ))}
    </div>
  );
}

export default ChooseQuizData;
