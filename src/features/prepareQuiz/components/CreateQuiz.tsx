import React, { useState } from "react";
import "../style/CreateQuiz.css";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { postQuiz } from "../../../api";
import axios from "axios";

type CreateQuizProps = {
  studySetID: string;
  studySetTitle: string;
  closeCreateQuiz?: () => void;
};

const CreateQuiz = ({
  studySetID,
  closeCreateQuiz,
  studySetTitle,
}: CreateQuizProps) => {
  const { addQuiz } = useQuizContext();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  async function handleGenerateAnswerWithAI(e: React.MouseEvent) {
    e.stopPropagation();

    if (question.length > 500) {
      alert("問題が長すぎるよ");
      return;
    }

    if (!question) {
      alert("問題を入力してね");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("ログインしてね");
      return;
    }

    setIsGenerating(true);

    const prompt = `問題: ${question} 
    
    上にある、問題に対する回答を出力してください。

    出力要件:
    簡潔に50文字程度を目安にしてください。
    回答以外の余計な文章は必要ないです。
    あなたの返答ではなく、ユーザー自身が書いた回答のように出力してください。
    "です"といった言葉で文章を終わるのは、今回は自然ではないので、体言止めを中心に文章をしめてください。
    この問題は${studySetTitle}というデータセットに含まれるので、それをふまえた回答をしてください。
    `;

    try {
      const response = await axios.post(
        `${BASE_BACKEND_URL}/flashcards/generate`,
        {
          question: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      const data = response.data;
      setAnswer(data.answer);
    } catch (error) {
      alert("答えを生成できませんでした。");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="create-quiz-container">
      <h2>クイズを追加</h2>
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
            value={isGenerating ? "答えを考え中..." : answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            rows={5} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="答えを入力"
          />
        </div>

        <button type="submit" className="quiz-create-submit-btn">
          クイズを作成
        </button>
      </form>

      <button
        onClick={handleGenerateAnswerWithAI}
        className="answer-generate-btn"
      >
        答えを書いてもらう
      </button>
      <p className="generate-apologize-words">
        間違うこともあるから、参考程度に使ってみてね
      </p>
    </div>
  );
};

export default CreateQuiz;
