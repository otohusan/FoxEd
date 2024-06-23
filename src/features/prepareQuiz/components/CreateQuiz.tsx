import React, { useState } from "react";
import "../style/CreateQuiz.css";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { postQuiz } from "../../../api";

type CreateQuizProps = {
  studySetID: string;
  closeCreateQuiz?: () => void;
};

const CreateQuiz = ({ studySetID, closeCreateQuiz }: CreateQuizProps) => {
  const { addQuiz } = useQuizContext();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  //APIに新しいクイズを送信とstateにもセット
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // DB更新に成功したらstate更新
    try {
      // クイズデータをバックエンドに送信
      const flashcardID = await postQuiz(
        `${BASE_BACKEND_URL}/flashcards/${studySetID}`,
        {
          question,
          answer,
        }
      );
      // stateの更新
      addQuiz({
        id: flashcardID,
        answer: answer,
        question: question,
        study_set_id: studySetID,
        updated_at: "",
        created_at: "",
      });

      // 入力欄をからに
      setAnswer("");
      setQuestion("");

      if (closeCreateQuiz) {
        closeCreateQuiz();
      }

      alert("クイズを追加しました");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>クイズを追加</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>問題</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            rows={5} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="問題を入力"
          />
        </div>
        <div>
          <label>答え</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            rows={5} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="答えを入力"
          />
        </div>

        <button type="submit">クイズを作成</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
