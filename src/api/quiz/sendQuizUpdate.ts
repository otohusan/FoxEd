import axios from "axios";

type QuizUpdate = {
  question: string;
  answer: string;
};

const sendQuizUpdate = async (url: string, quiz: QuizUpdate): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  try {
    // バックエンドにクイズの更新を送信
    await axios.put(url, quiz, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("クイズの更新に失敗しました");
  }
};

export default sendQuizUpdate;
