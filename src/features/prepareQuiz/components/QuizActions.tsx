import { TbCards } from "react-icons/tb";
import { TiArrowShuffle } from "react-icons/ti";
import { Flashcard, QuizFormat } from "../../../../type";
import { FiPlus } from "react-icons/fi";
import "../style/QuizActions.css";
import FavoriteButton from "../../chooseQuiz/components/FavoriteButton";
import { FaRegCopy } from "react-icons/fa6";
import { MdIosShare } from "react-icons/md";
import handleCopy from "../../../api/studySet/copyStudySetForMe";
import { useAuth } from "../../../components/auth/useAuth";
import shareContent from "../../../api/shareContent";

type QuizActionsProps = {
  setQuizFormat: React.Dispatch<React.SetStateAction<QuizFormat | null>>;
  quizFormat: QuizFormat | null;
  openCreateQuiz: () => void;
  isOwner: boolean;
};

function QuizActions({
  setQuizFormat,
  quizFormat,
  openCreateQuiz,
  isOwner,
}: QuizActionsProps) {
  const quizzes = quizFormat ? quizFormat.body : [];
  const { user, userStudySets, setUserStudySets } = useAuth();

  // WARN: 簡易的にガード型を作成してる
  // WARN: undefinedを使う方が良いとも見たけど、理解しきれてない
  function isFlashcardArray(arr: any[]): arr is Flashcard[] {
    return arr.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.study_set_id === "string" &&
        typeof item.question === "string" &&
        typeof item.answer === "string" &&
        typeof item.created_at === "string" &&
        typeof item.updated_at === "string"
    );
  }

  const shuffleQuizzes = () => {
    const shuffled = [...quizzes].sort(() => Math.random() - 0.5);
    setQuizFormat({
      ...quizFormat,
      body: shuffled,
      label: quizFormat?.label || "",
      description: quizFormat?.description || "",
      user_id: quizFormat?.user_id || "",
      id: quizFormat?.id || "",
      created_at: quizFormat?.created_at || "",
      updated_at: quizFormat?.updated_at || "",
    });
  };

  const reverseQuizzes = () => {
    const reversed = quizzes.map((quiz) => ({
      ...quiz,
      question: quiz.answer,
      answer: quiz.question,
    }));
    setQuizFormat({
      ...quizFormat,
      body: reversed,
      label: quizFormat?.label || "",
      description: quizFormat?.description || "",
      user_id: quizFormat?.user_id || "",
      id: quizFormat?.id || "",
      created_at: quizFormat?.created_at || "",
      updated_at: quizFormat?.updated_at || "",
    });
  };

  const handleClickCopy = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (
      quizFormat?.label &&
      quizFormat?.description &&
      quizFormat.id &&
      userStudySets?.length !== undefined
    ) {
      handleCopy(
        e,
        quizFormat.label,
        quizFormat.description,
        quizFormat.id,
        user,
        userStudySets.length,
        setUserStudySets
      );
    } else {
      console.error("必須のデータが不足しています");
    }
  };

  // share機能
  const handleShare = () => {
    let shareURL = quizFormat?.id
      ? `https://konwalk.jp/PrepareQuiz?studySetID=${quizFormat?.id}`
      : "https://konwalk.jp";

    shareContent({
      title: "Konwalk",
      text: `コンウォークで、${quizFormat?.label}を勉強中！`,
      url: shareURL,
    });
  };

  return (
    <div
      className="quiz-actions"
      style={!quizFormat?.id ? { justifyContent: "center", padding: "0" } : {}}
    >
      {quizFormat && isFlashcardArray(quizFormat.body) && (
        <div className="quiz-action-btn-container">
          <div className="quiz-action-btn">
            <FavoriteButton
              studySet={{
                id: quizFormat?.id || "",
                user_id: quizFormat?.user_id || "",
                title: quizFormat?.label,
                description: quizFormat?.description || "",
                created_at: quizFormat?.created_at,
                updated_at: quizFormat?.updated_at,
                flashcards: quizFormat?.body || "",
              }}
              IconSize="20px"
            />
          </div>
          <span className="quiz-action-btn-label">お気に入り</span>
        </div>
      )}
      {isOwner && quizFormat?.id && (
        <div className="quiz-action-btn-container" onClick={openCreateQuiz}>
          <button className="quiz-action-btn">
            <FiPlus size={"20px"} />
          </button>
          <span className="quiz-action-btn-label">追加</span>
        </div>
      )}
      <div className="quiz-action-btn-container">
        <button className="quiz-action-btn" onClick={shuffleQuizzes}>
          <TiArrowShuffle size={"20px"} />
        </button>
        <span className="quiz-action-btn-label">シャッフル</span>
      </div>

      <div className="quiz-action-btn-container">
        <button className="quiz-action-btn" onClick={reverseQuizzes}>
          <TbCards size={"20px"} />
        </button>
        <span className="quiz-action-btn-label">反転</span>
      </div>

      {!isOwner && quizFormat && isFlashcardArray(quizFormat.body) && (
        <div className="quiz-action-btn-container">
          <button
            className="quiz-action-btn"
            onClick={(e) => {
              handleClickCopy(e);
            }}
          >
            <FaRegCopy size={"16px"} />
          </button>
          <span className="quiz-action-btn-label">コピー</span>
        </div>
      )}

      <div className="quiz-action-btn-container">
        <button className="quiz-action-btn" onClick={handleShare}>
          <MdIosShare size={"18px"} />
        </button>
        <span className="quiz-action-btn-label">共有</span>
      </div>
    </div>
  );
}

export default QuizActions;
