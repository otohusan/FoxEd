import PrepareQuizzes from "../features/prepareQuiz/components/PrepareQuizzes";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type PrepareQuizProps = {
  quizzes: Quiz[];
};

function PrepareQuiz({ quizzes }: PrepareQuizProps) {
  return (
    <>
      <PrepareQuizzes quizzes={quizzes} />
    </>
  );
}

export default PrepareQuiz;
