import { Header, Footer, HeadDataHelmet } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";
import "../style/ChooseQuizContainer.css";
import { QuizFormat } from "../../../../type/index.ts";
import { quizzes as yumetan } from "../../../assets/quizzes.ts";
import Introduction from "../introduction/Introduction.tsx";
import SelectQuizModeContainer from "./SelectQuizModeContainer.tsx";
import { useEffect, useState } from "react";
// import { useAuth } from "../../../components/auth/useAuth.ts";
import useFetch from "../../../hooks/useFetch.ts";
import { StudySet } from "../../../../type/index.ts";
import { useQuizContext } from "../../../components/quiz/useQuizContext.ts";

type ChooseQuizProps = {
  quizzes: QuizFormat[];
};

function ChooseQuiz({ quizzes }: ChooseQuizProps) {
  const { setQuizFormat } = useQuizContext();

  const [isSelectModeOpen, setIsSelectModeOpen] = useState(false);
  // selectModeコンポーネントの位置を設定するステート（例）
  const [selectModePosition, setSelectModePosition] = useState({ x: 0, y: 0 });

  // ロジックが多く描かれてしまってる
  // selectするメニューを表示する場所を計算する関数
  function QuizDataOnChoice(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const SELECT_MODE_WIDTH = 200; // 例: 200pxの幅
    const SELECT_MODE_HEIGHT = 100; // 例: 100pxの高さ

    // クリックされた座標を取得
    let x = event.clientX;
    let y = event.clientY;

    // 画面の幅と高さを取得
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // selectModeが画面右端または下端からはみ出さないように調整
    if (x + SELECT_MODE_WIDTH > screenWidth) {
      x = screenWidth - SELECT_MODE_WIDTH; // 右端に合わせて位置を調整
    }
    if (y + SELECT_MODE_HEIGHT > screenHeight) {
      y = screenHeight - SELECT_MODE_HEIGHT; // 下端に合わせて位置を調整
    }

    // スクロール量を追加
    y += window.scrollY - 50;

    setIsSelectModeOpen(true);
    setSelectModePosition({ x, y });
  }

  // メニューの外側のクリックを検出する関数
  const handleClickOutside = (event: MouseEvent) => {
    // ここで`SelectQuizModeContainer`コンポーネントやその子要素がクリックされたかどうかをチェック
    const selectModeContainer = document.querySelector(
      ".SelectQuizModeContainer"
    );
    if (
      selectModeContainer &&
      !selectModeContainer.contains(event.target as Node)
    ) {
      setIsSelectModeOpen(false);
    }
  };

  useEffect(() => {
    // 実行環境がブラウザであることを確認
    if (typeof window !== "undefined") {
      // イベントリスナーを追加
      document.addEventListener("mousedown", handleClickOutside);

      // コンポーネントがアンマウントされた時にイベントリスナーを削除
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

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

        {isSelectModeOpen ? (
          <SelectQuizModeContainer
            x={selectModePosition.x}
            y={selectModePosition.y}
          />
        ) : (
          <></>
        )}
        <div className="ChooseTopTitle">英単語リスト</div>
        <div className="hr-line"></div>

        {/* ユーザが作成した学習セットを表示 */}
        {data && <div className="ChooseQuizListTitle">あなたの学習セット</div>}
        {data && data.length > 0 ? (
          <div className="ChooseQuizDataList">
            {/* 取得した学習セットを表示 */}
            {data.map((studyset) => (
              <div
                onClick={(event) => {
                  setQuizFormat({
                    id: studyset.id,
                    user_id: studyset.user_id,
                    label: studyset.title,
                    body: studyset.flashcards,
                  });
                  QuizDataOnChoice(event);
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
          <p>No study sets available.</p>
        )}

        {/* Konwalk作成の学習セット */}
        <div className="ChooseQuizListTitle">TOIEC英単語</div>
        <div className="ChooseQuizDataList">
          {quizzes.map((quizFormat, index) => (
            <div
              key={index}
              onClick={(event) => {
                setQuizFormat(quizFormat);
                QuizDataOnChoice(event);
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
              onClick={(event) => {
                setQuizFormat(quizFormat);
                QuizDataOnChoice(event);
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
