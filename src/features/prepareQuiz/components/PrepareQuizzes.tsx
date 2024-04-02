import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
// import FootPrint from "./FootPrint";
import { Header, Footer, HeadDataHelmet } from "../../../components";
import MovableSheet from "./MovableSheet";
import { CgArrowsExchange } from "react-icons/cg";
import { Quiz } from "../../../../type/index.ts";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageHeadDescription: string = `無料で『${quizLabel}』をbasicな英単語帳から学べます。赤シートを有効に使って、英単語を覚えましょう。`;
  return (
    <div>
      <HeadDataHelmet
        pageTitle="予習ページ"
        pageDescription={pageHeadDescription}
        pagePath="PrepareQuiz"
      />

      <Header HeaderTitle="Prepare" />

      <Link to={"/"} className="PrepareQuizBackToChooseBtnAndLabel">
        <div className="PrepareQuizBackToChooseBtn">
          <CgArrowsExchange size={"1.5em"} />
        </div>
        <div className="PrepareQuizLabel">{quizLabel}</div>
      </Link>

      {/* <FootPrint /> */}
      <div className="PrepareQuizList">{PrepareQuizList}</div>
      <MovableSheet />
      <Footer />
    </div>
  );
}

export default PrepareQuizzes;
