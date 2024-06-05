import React, { useState } from "react";
import axios from "axios";
import { Quiz } from "../../../../type/index.ts";

type CreateQuizProps = {
  studySetID: string;
};

const CreateQuiz = ({ studySetID }: CreateQuizProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newQuiz: Quiz = {
      question,
      answer,
    };

    try {
      // クイズデータをバックエンドに送信
      await axios.post(
        `http://your-backend-url/quizzes/${studySetID}`,
        newQuiz
      );
      alert("クイズが作成されました");
    } catch (error) {
      console.error("クイズの作成に失敗しました", error);
      alert("クイズの作成に失敗しました");
    }
  };

  return (
    <div className="create-quiz-container">
      <h1>クイズ作成</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>問題文</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>正解</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>

        <button type="submit">クイズを作成</button>
      </form>
    </div>
  );
};

export default CreateQuiz;
