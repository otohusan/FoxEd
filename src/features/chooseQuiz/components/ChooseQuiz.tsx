import { Header, Footer, HeadDataHelmet, PopupMenu } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";
import "../style/ChooseQuizContainer.css";
import { StudySet } from "../../../../type/index.ts";
import { quizzes as yumetan } from "../../../assets/quizzes.ts";
import { allQuizzes as quizzes } from "../../../assets/allQuizData.ts";
import Introduction from "../introduction/Introduction.tsx";
import { useState } from "react";
// import { useAuth } from "../../../components/auth/useAuth.ts";
import useFetch from "../../../hooks/useFetch.ts";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";

function ChooseQuiz() {
  const { setQuizFormat } = useQuizContext();

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

  // const { user } = useAuth();
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const userID = "4b626883-64fd-4fde-a389-d2d5c185f604"; // テスト用のユーザーID

  // ユーザの学習セットを検索
  const { data } = useFetch<StudySet[]>(
    `${BASE_BACKEND_URL}/studysets/user/${userID}`
  );

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
        />

        <div className="ChooseTopTitle">英単語リスト</div>
        <div className="hr-line"></div>

        {/* ユーザが作成した学習セットを表示 */}
        {data && <div className="ChooseQuizListTitle">あなたの学習セット</div>}
        {data && data.length > 0 ? (
          <div className="ChooseQuizDataList">
            {/* 取得した学習セットを表示 */}
            {data.map((studyset) => (
              <div
                onClick={() => {
                  setQuizFormat({
                    id: studyset.id,
                    user_id: studyset.user_id,
                    label: studyset.title,
                    body: studyset.flashcards,
                  });
                  handleOpen();
                }}
                className="ChooseQuizContainerWrapper"
                key={studyset.id}
              >
                <ChooseQuizContainer
                  key={studyset.id}
                  // WARN: flashcardsとQuizのデータ型が違うから、setQuizが適切に動作しないと思う
                  quizFormat={{
                    label: studyset.title,
                    body: studyset.flashcards,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}

        {/* Konwalk作成の学習セット */}
        <div className="ChooseQuizListTitle">TOIEC英単語</div>
        <div className="ChooseQuizDataList">
          {quizzes.map((quizFormat, index) => (
            <div
              key={index}
              onClick={() => {
                setQuizFormat(quizFormat);
                handleOpen();
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
                handleOpen();
              }}
              className="ChooseQuizContainerWrapper"
            >
              <ChooseQuizContainer quizFormat={quizFormat} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ChooseQuiz;
