import { TbCards } from "react-icons/tb";
import { TiArrowShuffle } from "react-icons/ti";
import { QuizFormat } from "../../../../type";
import { GoPlus } from "react-icons/go";
import "../style/QuizActions.css";

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
    });
  };

  return (
    <div className="quiz-actions">
      <div className="quiz-action-btn-container">
        <button className="quiz-action-btn" onClick={shuffleQuizzes}>
          <TiArrowShuffle size={"20px"} />
        </button>
        <span className="quiz-action-btn-label">シャッフル</span>
      </div>
      {isOwner && quizFormat?.id && (
        <div className="quiz-action-btn-container" onClick={openCreateQuiz}>
          <button className="quiz-action-btn">
            <GoPlus size={"20px"} />
          </button>
          <span className="quiz-action-btn-label">追加</span>
        </div>
      )}
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
