import "../style/PrepareQuiz.css";
import PrepareQuiz from "./PrepareQuiz";
import {
  Header,
  Footer,
  HeadDataHelmet,
  QuizCard,
  PopupMenu,
} from "../../../components";
import MovableSheet from "./MovableSheet";
import { CgArrowsExchange } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HorizontalScroll from "../../../components/HorizontalScroll.tsx";
import { useAuth } from "../../../components/auth/useAuth.ts";
import CreateQuiz from "./CreateQuiz.tsx";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";
import { WindowVirtualizer } from "virtua";
import EditQuiz from "./EditQuiz.tsx";
import { sendQuizDelete } from "../../../api/index.tsx";

function PrepareQuizzes() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const { quizFormat, setCurrentQuizIndex } = useQuizContext();

  // 学習セットのオーナーであるかを判定
  const isOwner = user?.ID == quizFormat?.user_id;
  const quizzes = quizFormat ? quizFormat.body : [];

  const handleClickMenu = (
    e: React.MouseEvent,
    quiz: { id: string; question: string; answer: string }
  ) => {
    handleOpen(e);
    if (!quiz.id) {
      return;
    }
    setQuizData({
      quizId: quiz.id,
      prevQuestion: quiz.question,
      prevAnswer: quiz.answer,
    });
  };

  const PrepareQuizList = (
    <WindowVirtualizer>
      {quizzes &&
        quizzes.map((quiz, index) => (
          <div>
            <PrepareQuiz
              key={index}
              QuizID={quiz.id}
              QuizName={quiz.question}
              QuizAnswer={quiz.answer}
              QuizPartOfSpeech={"partOfSpeech" in quiz ? quiz.partOfSpeech : 8}
              QuizIndex={index}
              setCurrentQuizIndex={setCurrentQuizIndex}
              isOwner={isOwner}
              handleClickMenu={handleClickMenu}
            />
          </div>
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

  // menuに関わる者たち
  const [isSelectModeOpen, setIsSelectModeOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    let x = rect.left + 50;
    let y = rect.top + rect.height + window.scrollY - 100;

    if (x + 200 > screenWidth) {
      x = rect.left - 200 + rect.width; // メニューの幅を考慮
    }
    if (y - window.scrollY + 200 > screenHeight) {
      y = rect.top - 100 + window.scrollY; // メニューの高さを考慮
    }
    setMenuPosition({ x, y });
    setIsSelectModeOpen(true);
  };
  const handleClose = () => {
    setIsSelectModeOpen(false);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [quizData, setQuizData] = useState({
    quizId: "",
    prevQuestion: "",
    prevAnswer: "",
  });

  const handleEditQuiz = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const { deleteQuiz } = useQuizContext();
  // 削除用のロジック
  const handleDeleteQuiz = async () => {
    const isConfirmed = window.confirm("クイズを削除しますか？");
    if (isConfirmed) {
      try {
        // DBの更新が成功したらstateの更新
        await sendQuizDelete(
          `${VITE_BASE_BACKEND_URL}/flashcards/${quizData.quizId}`
        );
        deleteQuiz(quizData.quizId);
      } catch (error) {
        alert(error);
        return;
      } finally {
        setIsSelectModeOpen(false);
      }
    }
  };

  const menuItems = [
    { text: "編集を行う", onClick: handleEditQuiz },
    { text: "削除する", onClick: handleDeleteQuiz },
  ];

  const navigate = useNavigate();

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
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="PrepareQuizBackToChooseBtnAndLabel"
        >
          <div className="PrepareQuizBackToChooseBtn">
            <CgArrowsExchange size={"1.5em"} />
          </div>
          <div className="PrepareQuizLabel">{quizFormat?.label}</div>
        </button>

        {(!quizzes || quizzes.length == 0) && <p>新しい問題を追加しよう！</p>}

        <PopupMenu
          isOpen={isSelectModeOpen}
          onClose={handleClose}
          menuItems={menuItems}
          position={menuPosition}
        />

        {isEditing && (
          <EditQuiz
            quizId={quizData.quizId}
            prevQuestion={quizData.prevQuestion}
            prevAnswer={quizData.prevAnswer}
            onCancel={handleCancelEdit}
          />
        )}

        {quizzes && quizzes.length != 0 && (
          <HorizontalScroll>{cardList}</HorizontalScroll>
        )}
        <div className="PrepareQuizList">{PrepareQuizList}</div>

        {/* idが存在して、userと学習セットの著者が等しい場合に表示 */}
        {isOwner && quizFormat?.id && <CreateQuiz studySetID={quizFormat.id} />}

        <MovableSheet />
      </main>

      <Footer />
    </div>
  );
}

export default PrepareQuizzes;
