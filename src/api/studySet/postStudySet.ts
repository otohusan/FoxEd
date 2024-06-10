import axios from "axios";

type StudySetCreate = {
  title: string;
  description: string;
};

const postStudySet = async (studySet: StudySetCreate): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  try {
    await axios.post(`${BASE_BACKEND_URL}/studysets/`, studySet, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("学習セットの作成に失敗しました");
  }
};

export default postStudySet;
