import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
// import FootPrint from "./FootPrint";
import { Header } from "../../../components";
import MovableSheet from "./MovableSheet";

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

      {/* <FootPrint /> */}
      <div className="PrepareQuizList">{PrepareQuizList}</div>
      <MovableSheet />
    </div>
  );
}

export default PrepareQuizzes;
