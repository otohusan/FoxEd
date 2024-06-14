import axios from "axios";

type StudySetCreate = {
  title: string;
  description: string;
};

//学習セットのデータを送信
//返り値は作成された学習セットのIDを受け取る
const postStudySet = async (studySet: StudySetCreate): Promise<string> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("トークンが見つかりません");
  }

  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/studysets/`,
      studySet,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.id;
  } catch (error) {
    throw new Error("学習セットの作成に失敗しました");
  }
};

export default postStudySet;
