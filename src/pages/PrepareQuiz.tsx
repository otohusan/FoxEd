import PrepareQuizzes from "../features/prepareQuiz/components/PrepareQuizzes";
import { Quiz } from "../../type/index.ts";

type PrepareQuizProps = {
  quizzes: Quiz[];
  quizLabel: string;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
};

function PrepareQuiz({
  quizzes,
  quizLabel,
  setCurrentQuizIndex,
}: PrepareQuizProps) {
  return (
    <>
      <PrepareQuizzes
        quizzes={quizzes}
        quizLabel={quizLabel}
        setCurrentQuizIndex={setCurrentQuizIndex}
      />
    </>
  );
}

export default PrepareQuiz;
