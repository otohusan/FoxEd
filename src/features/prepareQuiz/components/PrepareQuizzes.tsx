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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalScroll from "../../../components/HorizontalScroll.tsx";
import { useAuth } from "../../../components/auth/useAuth.ts";
import CreateQuiz from "./CreateQuiz.tsx";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";
import { WindowVirtualizer } from "virtua";
import EditQuiz from "./EditQuiz.tsx";
import { sendQuizDelete } from "../../../api/index.tsx";
import QuizActions from "./QuizActions.tsx";
import usePopupMenu from "../../../hooks/usePopupMenu.ts";
import React from "react";

function PrepareQuizzes() {
  const { user } = useAuth();
  const { quizFormat, setCurrentQuizIndex, setQuizFormat } = useQuizContext();
  const {
    isPopupMenuOpen,
    popupMenuAnchor,
    handleOpenPopupMenu,
    handleClosePopupMenu,
  } = usePopupMenu();

  // 学習セットのオーナーであるかを判定
  const isOwner = user?.ID == quizFormat?.user_id;
  const quizzes = quizFormat ? quizFormat.body : [];

  // popupMenuをクリック時に起こす関数
  const handleClickMenu = (
    e: React.MouseEvent,
    quiz: { id: string; question: string; answer: string }
  ) => {
    setQuizData({
      quizId: quiz.id,
      prevQuestion: quiz.question,
      prevAnswer: quiz.answer,
    });

    handleOpenPopupMenu(e);
  };

  const PrepareQuizList = (
    <WindowVirtualizer>
      {quizzes &&
        quizzes.map((quiz, index) => (
          <div key={quiz.id || index} data-testid="quiz-list">
            <PrepareQuiz
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
      <React.Fragment>
        <QuizCard
          frontElement={quiz.question}
          backElement={quiz.answer}
          key={quiz.id}
          id={quiz.id || String(index)}
          handleClickMenu={handleClickMenu}
          isOwner={isOwner}
        />
      </React.Fragment>
    ));

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
        handleClosePopupMenu();
      }
    }
  };

  const navigate = useNavigate();

  // CreateQuiz用の状態管理
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const openCreateQuiz = () => {
    setIsCreatingQuiz(true);
  };
  const closeCreateQuiz = () => {
    setIsCreatingQuiz(false);
  };

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
            <CgArrowsExchange size={"25px"} />
          </div>
          <div className="PrepareQuizLabel">{quizFormat?.label}</div>
        </button>

        {(!quizzes || quizzes.length == 0) && (
          <p className="prompt-make-user-create-quiz">
            新しい問題を追加しよう！
          </p>
        )}

        <PopupMenu
          isOpen={isPopupMenuOpen}
          onClose={handleClosePopupMenu}
          menuItems={[
            { text: "編集を行う", onClick: handleEditQuiz },
            { text: "削除する", onClick: handleDeleteQuiz },
          ]}
          anchor={popupMenuAnchor}
        />

        {isEditing && (
          <EditQuiz
            quizId={quizData.quizId}
            prevQuestion={quizData.prevQuestion}
            prevAnswer={quizData.prevAnswer}
            studySetID={quizFormat?.id}
            onCancel={handleCancelEdit}
          />
        )}

        {isCreatingQuiz && quizFormat?.id && (
          <div className="prepare-create-modal">
            <div className="prepare-create-modal-content">
              <CreateQuiz
                studySetID={quizFormat?.id}
                closeCreateQuiz={closeCreateQuiz}
              />
              <button
                onClick={closeCreateQuiz}
                className="prepare-create-modal-cancel-btn"
              >
                閉じる
              </button>
            </div>
          </div>
        )}

        {quizzes && quizzes.length != 0 && (
          <HorizontalScroll>{cardList}</HorizontalScroll>
        )}
        {quizzes && quizzes.length != 0 && (
          <QuizActions
            setQuizFormat={setQuizFormat}
            quizFormat={quizFormat}
            openCreateQuiz={openCreateQuiz}
            isOwner={isOwner}
          />
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
