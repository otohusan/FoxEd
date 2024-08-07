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
import { useLocation, useNavigate } from "react-router-dom";
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
import AdListType from "../../../components/ad/AdListType.tsx";
import getQueryParam from "../../../utils/getQueryParam.ts";
import getStudySetById from "../../../api/studySet/getStudySetById.ts";

function PrepareQuizzes() {
  const { user } = useAuth();
  const { quizFormat, setCurrentQuizIndex, setQuizFormat } = useQuizContext();
  const {
    isPopupMenuOpen,
    popupMenuAnchor,
    handleOpenPopupMenu,
    handleClosePopupMenu,
  } = usePopupMenu();

  const queryStudySetID = getQueryParam("studySetID");

  useEffect(() => {
    if (queryStudySetID) {
      getQueryStudySet(queryStudySetID);
    }
  }, [queryStudySetID]);

  async function getQueryStudySet(queryStudySetID: string) {
    const res = await getStudySetById(queryStudySetID);
    setQuizFormat({
      id: res.id,
      user_id: res.user_id,
      label: res.title,
      description: res.description,
      body: res.flashcards,
      created_at: res.created_at,
      updated_at: res.updated_at,
    });
  }

  // 学習セットのオーナーであるかを判定
  // userも学習セットもidがnullの場合があるから、userの有無で場合分けしてる
  const isOwner = user ? user.ID == quizFormat?.user_id : false;
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

  // 広告を何単語ごとに表示するか
  const adFrequency = 6;
  const PrepareQuizList = (
    <WindowVirtualizer>
      {quizzes &&
        quizzes.map((quiz, index) => (
          <div key={quiz.id || index} data-testid="quiz-list">
            {index % adFrequency == 0 && <AdListType />}
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
      <QuizCard
        key={quiz.id || String(index)}
        id={quiz.id || String(index)}
        frontElement={quiz.question}
        backElement={quiz.answer}
        handleClickMenu={handleClickMenu}
        isOwner={isOwner}
      />
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
  const location = useLocation();

  // 戻るように使う
  const handleNavigateBack = () => {
    if (location.key === "default") {
      // 初期ロードのページの場合
      navigate("/");
    } else {
      // 前のページに戻る
      navigate(-1);
    }
  };

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
            handleNavigateBack();
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
                studySetTitle={quizFormat.label}
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
        {isOwner && quizFormat?.id && (
          <CreateQuiz
            studySetID={quizFormat.id}
            studySetTitle={quizFormat.label}
          />
        )}

        <MovableSheet />
      </main>

      <Footer />
    </div>
  );
}

export default PrepareQuizzes;
