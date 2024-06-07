import React, { useState } from "react";
import "../style/EditQuiz.css";

type EditQuizProps = {
  quizId: string;
  prevQuestion: string;
  prevAnswer: string;
  onCancel: () => void;
};

const EditQuiz: React.FC<EditQuizProps> = ({
  quizId,
  onCancel,
  prevQuestion,
  prevAnswer,
}) => {
  const [question, setQuestion] = useState(prevQuestion);
  const [answer, setAnswer] = useState(prevAnswer);

  const handleSave = () => {
    // onSave(quizId, question, answer);
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
