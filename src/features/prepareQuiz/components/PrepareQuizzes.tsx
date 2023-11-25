import "../style/PrepareQuiz.css";
import { quizzes } from "../../../assets/quizzes";
import PrepareQuiz from "./PrepareQuiz";
import { Header } from "../../../components";

function PrepareQuizzes() {
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
