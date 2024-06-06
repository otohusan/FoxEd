import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
import { Header, Footer, HeadDataHelmet, QuizCard } from "../../../components";
import MovableSheet from "./MovableSheet";
import { CgArrowsExchange } from "react-icons/cg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import HorizontalScroll from "../../../components/HorizontalScroll.tsx";
import { useAuth } from "../../../components/auth/useAuth.ts";
import CreateQuiz from "./CreateQuiz.tsx";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";
import { WindowVirtualizer } from "virtua";

function PrepareQuizzes() {
  const { quizFormat, setCurrentQuizIndex } = useQuizContext();
  const quizzes = quizFormat ? quizFormat.body : [];

  const PrepareQuizList = (
    <WindowVirtualizer>
      {quizzes &&
        quizzes.map((quiz, index) => (
          <PrepareQuiz
            key={index}
            QuizName={quiz.question}
            QuizAnswer={quiz.answer}
            QuizPartOfSpeech={"partOfSpeech" in quiz ? quiz.partOfSpeech : 7}
            QuizIndex={index}
            setCurrentQuizIndex={setCurrentQuizIndex}
          />
        ))}
    </WindowVirtualizer>
  );

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

  const pageHeadDescription: string = `無料で『${quizFormat?.label}』をbasicな英単語帳から学べます。赤シートを有効に使って、英単語を覚えましょう。`;
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
          <div className="PrepareQuizLabel">{quizFormat?.label}</div>
        </Link>

        {quizzes && <HorizontalScroll>{cardList}</HorizontalScroll>}
        <div className="PrepareQuizList">{PrepareQuizList}</div>

        {/* idが存在して、userと学習セットの著者が等しい場合に表示 */}
        {user?.ID == quizFormat?.user_id && quizFormat?.id && (
          <CreateQuiz studySetID={quizFormat.id} />
        )}

        <MovableSheet />
      </main>

      <Footer />
    </div>
  );
}

export default PrepareQuizzes;
