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
        setIsSelectModeOpen(false);
      } catch (error) {
        alert(error);
        return;
      }
    }
  };

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
  const menuItems = [
    { text: "編集を行う", onClick: handleEditStudySet },
    { text: "削除する", onClick: handleDeleteStudySet },
  ];

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

  return (
    <div>
      <HeadDataHelmet pageTitle="選択ページ" />
      <Header HeaderTitle="Choose" />
      <main>
        <Introduction />

        <PopupMenu
          isOpen={isSelectModeOpen}
          onClose={handleClose}
          menuItems={menuItems}
          position={menuPosition}
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
                    setQuizFormat({
                      id: studyset.id,
                      user_id: studyset.user_id,
                      label: studyset.title,
                      description: studyset.description,
                      body: studyset.flashcards,
                    });
                    // handleOpen();
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
                    }}
                  />
                  <div className="choose-quiz-menus">
                    <FavoriteButton studySet={studyset} />
                    {/* オーナーだった場合編集ボタンを追加 */}
                    {studyset.id &&
                      studyset.description &&
                      user?.ID == studyset.user_id && (
                        <button
                          className="owner-drop-menu"
                          onClick={(e) => {
                            setQuizFormat({
                              id: studyset.id,
                              user_id: studyset.user_id,
                              label: studyset.title,
                              description: studyset.description,
                              body: studyset.flashcards,
                            });
                            handleOpen(e);
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
                    setQuizFormat({
                      id: studyset.id,
                      user_id: studyset.user_id,
                      label: studyset.title,
                      description: studyset.description,
                      body: studyset.flashcards,
                    });
                    // handleOpen();
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
                    }}
                  />
                  <div className="choose-quiz-menus">
                    <FavoriteButton studySet={studyset} />
                    {/* オーナーだった場合編集ボタンを追加 */}
                    {studyset.id &&
                      studyset.description &&
                      user?.ID == studyset.user_id && (
                        <button
                          className="owner-drop-menu"
                          onClick={(e) => {
                            setQuizFormat({
                              id: studyset.id,
                              user_id: studyset.user_id,
                              label: studyset.title,
                              description: studyset.description,
                              body: studyset.flashcards,
                            });
                            handleOpen(e);
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
