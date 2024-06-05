import React, { useState } from "react";
import axios from "axios";
import "../style/CreateQuiz.css";

type CreateQuizProps = {
  studySetID: string;
};

const CreateQuiz = ({ studySetID }: CreateQuizProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // クイズデータをバックエンドに送信
      const token = localStorage.getItem("token"); // ローカルストレージからトークンを取得
      if (!token) {
        throw new Error("No token found");
      }

      // クイズデータをバックエンドに送信
      await axios.post(
        `${BASE_BACKEND_URL}/flashcards/${studySetID}`,
        {
          answer: answer,
          question: question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 認証ヘッダーにトークンを追加
          },
        }
      );
      alert("クイズが作成されました");
    } catch (error) {
      console.error("クイズの作成に失敗しました", error);
      alert("クイズの作成に失敗しました");
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
