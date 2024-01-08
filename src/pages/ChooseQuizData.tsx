import ChooseQuiz from "../features/chooseQuiz/components/ChooseQuiz";
import { QuizFormat } from "../../type/index.ts";

type ChooseQuizDataProps = {
  quizzes: QuizFormat[];
  setQuizzes: React.Dispatch<React.SetStateAction<QuizFormat>>;
};

function ChooseQuizData({ quizzes, setQuizzes }: ChooseQuizDataProps) {
  return (
    <div>
      <ChooseQuiz quizzes={quizzes} setQuizzes={setQuizzes} />
    </div>
  );
}

export default ChooseQuizData;
