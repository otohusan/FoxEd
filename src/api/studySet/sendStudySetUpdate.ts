import axios from "axios";

type StudySetUpdate = {
  title: string;
  description: string;
};

const sendStudySetUpdate = async (
  id: string,
  studySet: StudySetUpdate
): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  try {
    await axios.put(`${BASE_BACKEND_URL}/studysets/${id}`, studySet, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("学習セットの更新に失敗しました");
  }
};

export default sendStudySetUpdate;
