import ChooseQuiz from "../features/chooseQuiz/components/ChooseQuiz";

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
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

function ChooseQuizData({ quizzes, setQuizzes }: ChooseQuizDataProps) {
  return (
    <div>
      <ChooseQuiz quizzes={quizzes} setQuizzes={setQuizzes} />
    </div>
  );
}

export default ChooseQuizData;
