import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
import { Header } from "../../../components";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type PrepareQuizProps = {
  quizzes: Quiz[];
};

function PrepareQuizzes({ quizzes }: PrepareQuizProps) {
  const PrepareQuizList = quizzes.map((quiz, index) => (
    <PrepareQuiz
      key={index}
      QuizName={quiz.question}
      QuizAnswer={quiz.answer}
    />
  ));

  return (
    <div>
      <Header HeaderTitle="Prepare" />
      <div className="PrepareQuizList">{PrepareQuizList}</div>
    </div>
  );
}

export default PrepareQuizzes;
