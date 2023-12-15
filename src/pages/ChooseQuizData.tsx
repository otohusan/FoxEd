type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type ChooseQuizDataProps = {
  quizzes: Quiz[];
};

function ChooseQuizData({ quizzes }: ChooseQuizDataProps) {
  return (
    <div style={{ color: "black" }}>
      {quizzes.map((quiz) => (
        <>{quiz.answer}</>
      ))}
    </div>
  );
}

export default ChooseQuizData;
