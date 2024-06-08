import axios from "axios";

const sendStudySetDelete = async (studySetID: string): Promise<void> => {
  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  try {
    await axios.delete(`${VITE_BASE_BACKEND_URL}/studysets/${studySetID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("学習セットの削除に失敗しました");
  }
};

export default sendStudySetDelete;
