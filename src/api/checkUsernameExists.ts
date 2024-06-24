import axios from "axios";

const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

// ユーザ名の存在を確認する関数
const checkUsernameExists = async (username: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/users/username-exists`,
      {
        username: username,
      }
    );
    return response.data.result; // { result: true } 形式のレスポンスを期待
  } catch (error) {
    console.log(error);
    throw new Error("ユーザ名の確認に失敗しました。");
  }
};

export default checkUsernameExists;
