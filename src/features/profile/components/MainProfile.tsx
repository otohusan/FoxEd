import { useEffect, useState } from "react";
import { StudySet } from "../../../../type";
import { Footer, Header, PopupMenu } from "../../../components";
import LoginPrompt from "../../../components/LoginPrompt";
import { useAuth } from "../../../components/auth/useAuth";
import { useFetch } from "../../../hooks";
import ChooseQuizContainer from "../../chooseQuiz/components/ChooseQuizContainer";
import "../style/MainProfile.css";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import MakeStudySet from "./MakeStudySet";
import axios from "axios";
import OwnerStudySetMenu from "../../chooseQuiz/components/OwnerStudySetMenu";

function MainProfile() {
  // ページの先頭に戻る
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuth();
  const { setQuizFormat } = useQuizContext();

  // 期限切れてるのに取得してるから注意
  const userID = "4b626883-64fd-4fde-a389-d2d5c185f604";

  // ユーザの学習セットを検索
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const { data, setData } = useFetch<StudySet[]>(
    `${BASE_BACKEND_URL}/studysets/user/${userID}`
  );

  const handleNewStudySet = async () => {
    try {
      const response = await axios.get(
        `${BASE_BACKEND_URL}/studysets/user/${userID}`
      );
      setData(response.data);
    } catch (error) {
      console.error("学習セットの取得に失敗しました", error);
    }
  };

  // menuに関わる者たち
  const [isSelectModeOpen, setIsSelectModeOpen] = useState(false);
  const handleOpen = () => {
    setIsSelectModeOpen(true);
  };
  const handleClose = () => {
    setIsSelectModeOpen(false);
  };
  const menuItems = [
    { text: "歩いて覚える", link: "/PlayQuiz" },
    { text: "単語帳で覚える", link: "/PrepareQuiz" },
  ];

  return (
    <div className="profile-container">
      <Header HeaderTitle="Profile" />
      {/* ログインしていない場合にログインプロンプトを表示 */}
      <div className="profile-login-prompt-container">
        {!user && (
          <div className="profile-login-prompt">
            <LoginPrompt promptText="ログインして、自分だけの学習セットを作成しよう" />
          </div>
        )}
      </div>

      {/* ログインしている場合に学習セットを表示 */}
      {user && (
        <>
          {!data && <p>自分だけの学習セット作ってみよう！</p>}
          <PopupMenu
            isOpen={isSelectModeOpen}
            onClose={handleClose}
            menuItems={menuItems}
          />

          {data && (
            <div className="ChooseQuizListTitle">あなたの学習セット</div>
          )}
          {data && data.length > 0 && (
            <div className="ChooseQuizDataList">
              {/* 取得した学習セットを表示 */}
              {/* 新しいものを先に表示するために */}
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
                      handleOpen();
                    }}
                    className="ChooseQuizContainerWrapper"
                    key={studyset.id}
                  >
                    <ChooseQuizContainer
                      key={studyset.id}
                      quizFormat={{
                        label: studyset.title,
                        body: studyset.flashcards,
                      }}
                    />

                    {/* オーナーだった場合編集ボタンを追加 */}
                    {studyset.id &&
                      studyset.description &&
                      userID == studyset.user_id && (
                        <OwnerStudySetMenu
                          studySetID={studyset.id}
                          prevTitle={studyset.title}
                          prevDescription={studyset.description}
                          onNewStudySet={handleNewStudySet}
                        />
                      )}
                  </div>
                ))}
            </div>
          )}
          <MakeStudySet onNewStudySet={handleNewStudySet} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default MainProfile;
