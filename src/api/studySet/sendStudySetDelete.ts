import axios from "axios";

const sendStudySetDelete = async (url: string): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("学習セットの削除に失敗しました");
  }
};

export default sendStudySetDelete;
