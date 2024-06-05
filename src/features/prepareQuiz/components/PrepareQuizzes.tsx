import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
// import FootPrint from "./FootPrint";
import { Header, Footer, HeadDataHelmet, QuizCard } from "../../../components";
import MovableSheet from "./MovableSheet";
import { CgArrowsExchange } from "react-icons/cg";
import { Quiz } from "../../../../type/index.ts";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import HorizontalScroll from "../../../components/HorizontalScroll.tsx";
import { useAuth } from "../../../components/auth/useAuth.ts";
import CreateQuiz from "./CreateQuiz.tsx";

type PrepareQuizProps = {
  quizzes: Quiz[];
  id?: string;
  user_id?: string;
  quizLabel: string;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
};

function PrepareQuizzes({
  quizzes,
  quizLabel,
  id,
  user_id,
  setCurrentQuizIndex,
}: PrepareQuizProps) {
  const PrepareQuizList =
    quizzes &&
    quizzes.map((quiz, index) => (
      <PrepareQuiz
        key={index}
        QuizName={quiz.question}
        QuizAnswer={quiz.answer}
        QuizPartOfSpeech={quiz.partOfSpeech && quiz.partOfSpeech}
        QuizIndex={index}
        setCurrentQuizIndex={setCurrentQuizIndex}
      />
    ));

  const cardList =
    quizzes &&
    quizzes.map((quiz, index) => (
      <QuizCard
        frontElement={quiz.question}
        backElement={quiz.answer}
        key={index}
      />
    ));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();

  const pageHeadDescription: string = `無料で『${quizLabel}』をbasicな英単語帳から学べます。赤シートを有効に使って、英単語を覚えましょう。`;
  return (
    <div>
      <HeadDataHelmet
        pageTitle="予習ページ"
        pageDescription={pageHeadDescription}
        pagePath="PrepareQuiz"
      />

      <Header HeaderTitle="Prepare" />

      <main>
        <Link to={"/"} className="PrepareQuizBackToChooseBtnAndLabel">
          <div className="PrepareQuizBackToChooseBtn">
            <CgArrowsExchange size={"1.5em"} />
          </div>
          <div className="PrepareQuizLabel">{quizLabel}</div>
        </Link>
        <HorizontalScroll>{cardList}</HorizontalScroll>
        {/* idが存在して、userと学習セットの著者が等しい場合に表示 */}
        {user?.ID == user_id && id && <CreateQuiz studySetID={id} />}
        <div className="PrepareQuizList">{PrepareQuizList}</div>
        <MovableSheet />
      </main>

      <Footer />
    </div>
  );
}

export default PrepareQuizzes;
