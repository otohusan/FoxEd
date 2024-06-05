import ChooseQuiz from "../features/chooseQuiz/components/ChooseQuiz";
import { QuizFormat } from "../../type/index.ts";

type ChooseQuizDataProps = {
  quizzes: QuizFormat[];
};

function ChooseQuizData({ quizzes }: ChooseQuizDataProps) {
  return (
    <div>
      <ChooseQuiz quizzes={quizzes} />
    </div>
  );
}

export default ChooseQuizData;
