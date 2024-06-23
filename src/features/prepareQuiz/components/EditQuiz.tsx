import React, { useState } from "react";
import "../style/EditQuiz.css";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { sendQuizUpdate } from "../../../api";

type EditQuizProps = {
  quizId: string;
  prevQuestion: string;
  prevAnswer: string;
  studySetID: string | undefined;
  onCancel: () => void;
};

const EditQuiz: React.FC<EditQuizProps> = ({
  quizId,
  onCancel,
  prevQuestion,
  prevAnswer,
  studySetID,
}) => {
  const [question, setQuestion] = useState(prevQuestion);
  const [answer, setAnswer] = useState(prevAnswer);

  const { updateQuiz } = useQuizContext();
  const { quizFormat } = useQuizContext();

  // クイズを更新する関数
  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const handleSave = async () => {
    if (prevQuestion == question && prevAnswer == answer) {
      alert("入力が変わっていません");
      return;
    }
    if (!quizFormat || !quizFormat.id) return;

    // DB更新に成功したらstate更新
    try {
      // backEndに送る
      await sendQuizUpdate(`${VITE_BASE_BACKEND_URL}/flashcards/${quizId}`, {
        question: question,
        answer: answer,
        studySetID: quizFormat.id,
      });
      // stateの更新
      updateQuiz({
        id: quizId,
        question: question,
        answer: answer,
        study_set_id: studySetID,
        updated_at: "",
        created_at: "",
      });
      onCancel();
    } catch (error) {
      alert(error);
      return;
    }
  };

  return (
    <div className="edit-quiz-modal">
      <div className="edit-quiz-content">
        <h2>クイズを編集</h2>
        <div className="edit-quiz-each-content">
          <label>問題</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            rows={3} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="問題を入力"
          />
        </div>
        <div className="edit-quiz-each-content">
          <label>答え</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            rows={3} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="答えを入力"
          />
        </div>
        <button className="saveBtn" onClick={handleSave}>
          保存
        </button>
        <button onClick={onCancel}>キャンセル</button>
      </div>
    </div>
  );
};

export default EditQuiz;
