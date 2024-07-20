import React, { useState } from "react";
import "../style/CreateQuiz.css";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { postQuiz } from "../../../api";
import handleGenerateWithAI from "../api/handleGenerateWithAI";

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
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);

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

  const generateAnswerPrompt = `問題: ${question} 
    
  上にある、問題に対する回答を出力してください。

  出力要件:
  回答以外の余計な文章は必要ないです。
  問題の繰り返しのように思える回答は避けてください。
  あなたの返答ではなく、ユーザー自身が書いた回答のように出力してください。
  "です"といった言葉で文章を終わるのは、今回は自然ではないので、体言止めを中心に文章をしめてください。
  この問題は${studySetTitle}というデータセットに含まれるので、それをふまえた回答をしてください。
  `;
  async function handleGenerateAnswerWithAI(
    e: React.MouseEvent,
    prompt: string
  ) {
    e.stopPropagation();

    if (question.length > 500) {
      alert("問題が長すぎるよ");
      return;
    }

    if (!question) {
      alert("問題を入力してね");
      return;
    }

    setIsGeneratingAnswer(true);

    try {
      const response = await handleGenerateWithAI(prompt);

      const data = response?.data;
      setAnswer(data.answer);
    } catch (error) {
      alert("回答を生成できませんでした。");
    } finally {
      setIsGeneratingAnswer(false);
    }
  }

  const generateQuestionPrompt = `回答: ${answer} 
    
  上にある、回答に対する問題を作成してください。

  出力要件:
  問題以外の余計な文章は必要ないです。
  回答の繰り返しのように思える問題は避けてください。
  あなたの返答ではなく、ユーザー自身が書いた問題のように出力してください。
  この問題は${studySetTitle}というデータセットに含まれるので、それをふまえた問題を作成してください。
  `;
  async function handleGenerateQuestionWithAI(
    e: React.MouseEvent,
    prompt: string
  ) {
    e.stopPropagation();

    if (answer.length > 500) {
      alert("入力が長すぎるよ");
      return;
    }

    if (!answer) {
      alert("答えを入力してね");
      return;
    }

    setIsGeneratingQuestion(true);

    try {
      const response = await handleGenerateWithAI(prompt);
      const data = response?.data;

      setQuestion(data.answer);
    } catch (error) {
      alert("問題を生成できませんでした。");
    } finally {
      setIsGeneratingQuestion(false);
    }
  }

  return (
    <div className="create-quiz-container">
      <h2>クイズを追加</h2>
      <>
        <div>
          <div className="label-and-ai-btn-container">
            <label>問題</label>
            <button
              className="write-with-ai-btn"
              onClick={(e) => {
                handleGenerateQuestionWithAI(e, generateQuestionPrompt);
              }}
            >
              書いてもらう
            </button>
          </div>
          <textarea
            value={isGeneratingQuestion ? "問題を考え中..." : question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            rows={5} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="問題を入力"
          />
        </div>
        <div>
          <div className="label-and-ai-btn-container">
            <label>答え</label>
            <button
              className="write-with-ai-btn"
              onClick={(e) => {
                handleGenerateAnswerWithAI(e, generateAnswerPrompt);
              }}
            >
              書いてもらう
            </button>
          </div>
          <textarea
            value={isGeneratingAnswer ? "答えを考え中..." : answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            rows={5} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="答えを入力"
          />
        </div>

        <button
          type="submit"
          className="quiz-create-submit-btn"
          onClick={handleSubmit}
        >
          クイズを作成
        </button>
      </>
      {/* 
      <button
        onClick={(e) => {
          handleGenerateAnswerWithAI(e, generateAnswerPrompt);
        }}
        className="answer-generate-btn"
      >
        答えを書いてもらう
      </button>
      <button
        onClick={(e) => {
          handleGenerateQuestionWithAI(e, generateQuestionPrompt);
        }}
        className="answer-generate-btn"
      >
        問題を書いてもらう
      </button>
      <p className="generate-apologize-words">
        間違うこともあるから、参考程度に使ってみてね
      </p> */}
    </div>
  );
};

export default CreateQuiz;
