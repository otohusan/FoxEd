import { useEffect } from "react";
import { StudySet } from "../../../../type";
import { Footer, HeadDataHelmet, Header } from "../../../components";
import LoginPrompt from "../../../components/LoginPrompt";
import { useAuth } from "../../../components/auth/useAuth";
import ChooseQuizContainer from "../../chooseQuiz/components/ChooseQuizContainer";
import "../style/MainProfile.css";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import MakeStudySet from "./MakeStudySet";
import OwnerStudySetMenu from "../../chooseQuiz/components/OwnerStudySetMenu";
import { useNavigate } from "react-router-dom";
import getUserStudySets from "../../../api/studySet/getUserStudySets";

function MainProfile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user, userStudySets, setUserStudySets } = useAuth();
  const { setQuizFormat } = useQuizContext();
  const navigate = useNavigate();

  // const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  // const fetchUrl = user
  //   ? `${BASE_BACKEND_URL}/studysets/user/${user.ID}`
  //   : null;

  // const { data: studySets, setData: setStudySets } =
  //   useFetch<StudySet[]>(fetchUrl);

  // クイズに編集があった時、明示的にデータ更新するため
  const handleNewStudySet = async () => {
    // if (user) {
    //   try {
    //     const response = await axios.get(
    //       `${BASE_BACKEND_URL}/studysets/user/${user.ID}`
    //     );
    //     setStudySets(response.data);
    //   } catch (error) {
    //     console.error("学習セットの取得に失敗しました", error);
    //   }
    // }

    if (!user) {
      return;
    }

    setUserStudySets(await getUserStudySets(user?.ID));
  };

  // クイズがクリックされた時にそのデータを割り当てるのに使う
  const handleQuizSelect = (studyset: StudySet) => {
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
    <div className="profile-container">
      <HeadDataHelmet pageTitle="プロフィールページ" />
      <Header HeaderTitle="Profile" />
      {!user ? (
        <div className="profile-login-prompt-container">
          <LoginPrompt promptText="ログインして、自分だけの学習セットを作成しよう" />
        </div>
      ) : (
        <>
          <div className="profile-info">
            <div className="profile-info-item">
              <span className="profile-info-label-nickname">ニックネーム:</span>
              <span className="profile-info-value-nickname">{user.name}</span>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">ユーザーID:</span>
              <span className="profile-info-value">{user.ID}</span>
            </div>
          </div>

          {(!userStudySets || userStudySets.length === 0) && (
            <p className="profile-message-prompt-make">
              自分だけの学習セット作ってみよう！
            </p>
          )}

          {userStudySets && userStudySets.length > 0 && (
            <>
              <div className="ChooseQuizListTitle">あなたの学習セット</div>
              <div className="ChooseQuizDataList">
                {userStudySets
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() -
                      new Date(a.created_at).getTime()
                  )
                  .reverse()
                  .map((studyset) => (
                    <div
                      onClick={() => {
                        handleQuizSelect(studyset);
                        navigate("/PrepareQuiz");
                      }}
                      className="ChooseQuizContainerWrapper"
                      key={studyset.id}
                    >
                      <ChooseQuizContainer
                        quizFormat={{
                          label: studyset.title,
                          body: studyset.flashcards,
                          created_at: studyset.created_at,
                          updated_at: studyset.updated_at,
                        }}
                      />
                      {user.ID === studyset.user_id && (
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
            </>
          )}
          <MakeStudySet studySetQuantity={userStudySets?.length} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default MainProfile;
