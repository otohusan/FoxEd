import PrepareQuizzes from "../features/prepareQuiz/components/PrepareQuizzes";
import { Quiz } from "../../type/index.ts";

type PrepareQuizProps = {
  quizzes: Quiz[];
  quizLabel: string;
};

function PrepareQuiz({ quizzes, quizLabel }: PrepareQuizProps) {
  return (
    <>
      <PrepareQuizzes quizzes={quizzes} quizLabel={quizLabel} />
    </>
  );
}

export default PrepareQuiz;
