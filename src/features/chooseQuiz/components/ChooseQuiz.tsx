import { Header, Footer, HeadDataHelmet } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";
import "../style/ChooseQuizContainer.css";
import { StudySet } from "../../../../type/index.ts";
import { quizzes as yumetan } from "../../../assets/quizzes.ts";
import { allQuizzes as quizzes } from "../../../assets/allQuizData.ts";
import Introduction from "../introduction/Introduction.tsx";

import useFetch from "../../../hooks/useFetch.ts";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";
import OwnerStudySetMenu from "./OwnerStudySetMenu.tsx";
import axios from "axios";
import LoginPrompt from "../../../components/LoginPrompt.tsx";
import { useAuth } from "../../../components/auth/useAuth.ts";
import { useNavigate } from "react-router-dom";

function ChooseQuiz() {
  const { setQuizFormat } = useQuizContext();

  // menuに関わる者たち
  // const [isSelectModeOpen, setIsSelectModeOpen] = useState(false);
  // const handleOpen = () => {
  //   setIsSelectModeOpen(true);
  // };
  // const handleClose = () => {
  //   setIsSelectModeOpen(false);
  // };
  // const menuItems = [
  //   { text: "歩いて覚える", link: "/PlayQuiz" },
  //   { text: "単語帳で覚える", link: "/PrepareQuiz" },
  // ];

  const { user } = useAuth();
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

        {/* <PopupMenu
          isOpen={isSelectModeOpen}
          onClose={handleClose}
          menuItems={menuItems}
        /> */}

        <div className="ChooseTopTitle">英単語リスト</div>
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
                  {/* オーナーだった場合編集ボタンを追加 */}
                  {studyset.id &&
                    studyset.description &&
                    user?.ID == studyset.user_id && (
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
