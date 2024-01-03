import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
// import FootPrint from "./FootPrint";
import { Header, Footer } from "../../../components";
import MovableSheet from "./MovableSheet";
import { CgArrowsExchange } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type PrepareQuizProps = {
  quizzes: Quiz[];
  quizLabel: string;
};

function PrepareQuizzes({ quizzes, quizLabel }: PrepareQuizProps) {
  const navigate = useNavigate();
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
      <div
        className="PrepareQuizBackToChooseBtnAndLabel"
        onClick={() => {
          navigate("/ChooseQuizData");
        }}
      >
        <div className="PrepareQuizBackToChooseBtn">
          <CgArrowsExchange size={"1.5em"} />
        </div>
        <div className="PrepareQuizLabel">{quizLabel}</div>
      </div>

      {/* <FootPrint /> */}
      <div className="PrepareQuizList">{PrepareQuizList}</div>
      <MovableSheet />
      <Footer />
    </div>
  );
}

export default PrepareQuizzes;
