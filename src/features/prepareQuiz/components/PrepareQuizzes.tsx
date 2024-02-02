import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
// import FootPrint from "./FootPrint";
import { Header, Footer, HeadDataHelmet } from "../../../components";
import MovableSheet from "./MovableSheet";
import { CgArrowsExchange } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../../../type/index.ts";

type PrepareQuizProps = {
  quizzes: Quiz[];
  quizLabel: string;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
};

function PrepareQuizzes({
  quizzes,
  quizLabel,
  setCurrentQuizIndex,
}: PrepareQuizProps) {
  const navigate = useNavigate();
  const PrepareQuizList = quizzes.map((quiz, index) => (
    <PrepareQuiz
      key={index}
      QuizName={quiz.question}
      QuizAnswer={quiz.answer}
      QuizPartOfSpeech={quiz.partOfSpeech}
      QuizIndex={index}
      setCurrentQuizIndex={setCurrentQuizIndex}
    />
  ));

  const pageDescription: string = `『${quizLabel}』をbasicな英単語帳から学べます。赤シートを有効に使って、英単語を覚えましょう。`;
  return (
    <div>
      <HeadDataHelmet
        pageTitle="予習ページ"
        pageDescription={pageDescription}
      />

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
