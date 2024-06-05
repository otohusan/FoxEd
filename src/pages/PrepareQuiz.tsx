import PrepareQuizzes from "../features/prepareQuiz/components/PrepareQuizzes";
import { Quiz } from "../../type/index.ts";

type PrepareQuizProps = {
  quizzes: Quiz[];
  id?: string;
  user_id?: string;
  quizLabel: string;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
};

function PrepareQuiz({
  quizzes,
  id,
  user_id,
  quizLabel,
  setCurrentQuizIndex,
}: PrepareQuizProps) {
  return (
    <>
      <PrepareQuizzes
        quizzes={quizzes}
        id={id}
        user_id={user_id}
        quizLabel={quizLabel}
        setCurrentQuizIndex={setCurrentQuizIndex}
      />
    </>
  );
}

export default PrepareQuiz;
