import PrepareQuizzes from "../features/prepareQuiz/components/PrepareQuizzes";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
  partOfSpeech: number;
};

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
