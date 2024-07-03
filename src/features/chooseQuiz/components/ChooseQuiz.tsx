import { Header, Footer, HeadDataHelmet, PopupMenu } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";
import "../style/ChooseQuizContainer.css";
import { StudySet } from "../../../../type/index.ts";
import { quizzes as yumetan } from "../../../assets/quizzes.ts";
import { allQuizzes as quizzes } from "../../../assets/allQuizData.ts";
import Introduction from "../introduction/Introduction.tsx";
import { RxDotsHorizontal } from "react-icons/rx";
import useFetch from "../../../hooks/useFetch.ts";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";
// import OwnerStudySetMenu from "./OwnerStudySetMenu.tsx";
import axios from "axios";
import LoginPrompt from "../../../components/LoginPrompt.tsx";
import { useAuth } from "../../../components/auth/useAuth.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendStudySetDelete } from "../../../api/index.tsx";
import EditStudySet from "./EditStudySet.tsx";
import FavoriteButton from "./FavoriteButton.tsx";
import usePopupMenu from "../../../hooks/usePopupMenu.ts";

function ChooseQuiz() {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditStudySet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const { setQuizFormat, quizFormat } = useQuizContext();

  const handleDeleteStudySet = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("学習セットを削除しますか？");
    if (isConfirmed) {
      try {
        // DBの更新が成功したらstateの更新
        if (!quizFormat) {
          return;
        }

        if (!quizFormat.id) {
          return;
        }

        await sendStudySetDelete(quizFormat?.id);

        handleNewStudySet();
        handleClosePopupMenu();
      } catch (error) {
        alert(error);
        return;
      }
    }
  };

  // menuに関わる者たち
  const {
    isPopupMenuOpen,
    popupMenuAnchor,
    handleOpenPopupMenu,
    handleClosePopupMenu,
  } = usePopupMenu();
  const handleClickMenu = (e: React.MouseEvent) => {
    handleOpenPopupMenu(e);
  };

  const { user, favoriteItems } = useAuth();
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  // userがない場合にはFetchを行わないように
  // nullの場合はuseFetch内でFetchが実行されないようになってる
  const fetchUrl = user
    ? `${BASE_BACKEND_URL}/studysets/user/${user.ID}`
    : null;

  // ユーザの学習セットを検索
  const { data, setData } = useFetch<StudySet[]>(fetchUrl);

  // 明示的にデータを更新する
  const handleNewStudySet = async () => {
    try {
      const response = await axios.get(
        `${BASE_BACKEND_URL}/studysets/user/${user?.ID}`
      );
      setData(response.data);
    } catch (error) {
      console.error("学習セットの取得に失敗しました", error);
    }
  };

  const navigate = useNavigate();

  // ユーザやお気に入りの学習セットがクリックされた時に使う関数
  const handleClickStudySet = (studyset: StudySet) => {
    setQuizFormat({
      id: studyset.id,
      user_id: studyset.user_id,
      label: studyset.title,
      description: studyset.description,
      body: studyset.flashcards,
      created_at: studyset.created_at,
      updated_at: studyset.updated_at,
    });
  };

  return (
    <div>
      <HeadDataHelmet pageTitle="選択ページ" />
      <Header HeaderTitle="Choose" />
      <main>
        <Introduction />

        <PopupMenu
          isOpen={isPopupMenuOpen}
          onClose={handleClosePopupMenu}
          menuItems={[
            { text: "編集を行う", onClick: handleEditStudySet },
            { text: "削除する", onClick: handleDeleteStudySet },
          ]}
          anchor={popupMenuAnchor}
        />

        {isEditing && quizFormat?.id && quizFormat.description && (
          <EditStudySet
            studySetId={quizFormat?.id}
            prevTitle={quizFormat?.label}
            prevDescription={quizFormat?.description}
            onCancel={handleCancelEdit}
            onNewStudySet={handleNewStudySet}
          />
        )}

        <div className="ChooseTopTitle">学習セット</div>
        <div className="hr-line"></div>

        {user && !data && (
          <p className="choose-quiz-make-prompt">
            <span
              className="choose-quiz-make-prompt-url"
              onClick={() => {
                navigate("/Profile");
              }}
            >
              プロフィール
            </span>
            から、オリジナル学習セットを作成しよう！
          </p>
        )}

        {/* ユーザが作成した学習セットを表示 */}
        {data && <div className="ChooseQuizListTitle">あなたの学習セット</div>}
        {data && data.length > 0 ? (
          <div className="ChooseQuizDataList">
            {/* 取得した学習セットを表示 */}
            {data
              .slice()
              .reverse()
              .map((studyset) => (
                <div
                  onClick={() => {
                    handleClickStudySet(studyset);
                    navigate("/PrepareQuiz");
                  }}
                  className="ChooseQuizContainerWrapper"
                  key={studyset.id}
                >
                  <ChooseQuizContainer
                    key={studyset.id}
                    // WARN: flashcardsとQuizのデータ型が違うから、setQuizが適切に動作しないと思う
                    quizFormat={{
                      id: studyset.id,
                      label: studyset.title,
                      description: studyset.description,
                      body: studyset.flashcards,
                      created_at: studyset.created_at,
                      updated_at: studyset.updated_at,
                    }}
                  />
                  <div className="choose-quiz-menus">
                    <FavoriteButton studySet={studyset} IconSize="25px" />
                    {/* オーナーだった場合編集ボタンを追加 */}
                    {studyset.id &&
                      studyset.description &&
                      user?.ID == studyset.user_id && (
                        <button
                          className="owner-drop-menu"
                          onClick={(e) => {
                            handleClickStudySet(studyset);
                            handleClickMenu(e);
                          }}
                        >
                          <RxDotsHorizontal size={"23px"} />
                        </button>
                      )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <></>
        )}

        {/* ユーザが作成した学習セットを表示 */}
        {favoriteItems && favoriteItems.length > 0 && (
          <div className="ChooseQuizListTitle">あなたのお気に入り</div>
        )}
        {favoriteItems && favoriteItems.length > 0 ? (
          <div className="ChooseQuizDataList">
            {/* 取得した学習セットを表示 */}
            {favoriteItems
              .slice()
              .reverse()
              .map((studyset) => (
                <div
                  onClick={() => {
                    handleClickStudySet(studyset);
                    navigate("/PrepareQuiz");
                  }}
                  className="ChooseQuizContainerWrapper"
                  key={studyset.id}
                >
                  <ChooseQuizContainer
                    key={studyset.id}
                    // WARN: flashcardsとQuizのデータ型が違うから、setQuizが適切に動作しないと思う
                    quizFormat={{
                      id: studyset.id,
                      label: studyset.title,
                      description: studyset.description,
                      body: studyset.flashcards,
                      created_at: studyset.created_at,
                      updated_at: studyset.updated_at,
                    }}
                  />
                  <div className="choose-quiz-menus">
                    <FavoriteButton studySet={studyset} IconSize="25px" />
                    {/* オーナーだった場合編集ボタンを追加 */}
                    {studyset.id &&
                      studyset.description &&
                      user?.ID == studyset.user_id && (
                        <button
                          className="owner-drop-menu"
                          onClick={(e) => {
                            handleClickStudySet(studyset);
                            handleClickMenu(e);
                          }}
                        >
                          <RxDotsHorizontal size={"23px"} />
                        </button>
                      )}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <></>
        )}

        {/* Konwalk作成の学習セット */}
        <div className="ChooseQuizListTitle">TOEIC英単語</div>
        <div className="ChooseQuizDataList">
          {quizzes.map((quizFormat, index) => (
            <div
              key={index}
              onClick={() => {
                setQuizFormat(quizFormat);
                // handleOpen();
                navigate("/PrepareQuiz");
              }}
              className="ChooseQuizContainerWrapper"
            >
              <ChooseQuizContainer quizFormat={quizFormat} />
            </div>
          ))}
        </div>
        <div className="ChooseQuizListTitleKoukou">高校英単語</div>
        <div className="ChooseQuizDataList">
          {yumetan.map((quizFormat, index) => (
            <div
              key={index}
              onClick={() => {
                setQuizFormat(quizFormat);
                // handleOpen();
                navigate("/PrepareQuiz");
              }}
              className="ChooseQuizContainerWrapper"
            >
              <ChooseQuizContainer quizFormat={quizFormat} />
            </div>
          ))}
        </div>

        <div className="login-prompt-container">
          {!user && (
            <LoginPrompt promptText="ログインすれば、オリジナル学習セットを作成できる" />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ChooseQuiz;
