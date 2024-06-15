import axios from "axios";

type PostQuiz = {
  question: string;
  answer: string;
};

const postQuiz = async (url: string, quiz: PostQuiz): Promise<string> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  try {
    // バックエンドにクイズを送信
    const res = await axios.post(url, quiz, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.id;
  } catch (error) {
    throw new Error("クイズの作成に失敗しました");
  }
};

export default postQuiz;
