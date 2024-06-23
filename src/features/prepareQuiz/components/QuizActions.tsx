import { TbCards } from "react-icons/tb";
import { TiArrowShuffle } from "react-icons/ti";
import { QuizFormat } from "../../../../type";
import { FiPlus } from "react-icons/fi";
import "../style/QuizActions.css";
import FavoriteButton from "../../chooseQuiz/components/FavoriteButton";

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

  return (
    <div className="quiz-actions">
      {
        // NOTICE:
        // ガード型を使ったら、クイズ更新時にupdateとcreateがなくて表示されなくなった
        // その問題対処にquizFormat.idが存在するかしないかで判定
        // ここで警告出るけど、実際は問題が起きる行動は起きないはず
        quizFormat && quizFormat.id && (
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
        )
      }
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
    </div>
  );
}

export default QuizActions;
