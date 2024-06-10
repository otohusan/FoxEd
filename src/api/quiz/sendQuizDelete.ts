import axios from "axios";

const sendQuizDelete = async (url: string): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  try {
    // バックエンドにクイズの削除を送信
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("クイズの削除に失敗しました");
  }
};

export default sendQuizDelete;
