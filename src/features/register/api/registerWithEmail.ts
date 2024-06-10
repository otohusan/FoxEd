import axios from "axios";

// BASE_BACKEND_URLをインポートまたは定義してください
const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

// 新規登録用の関数
const registerWithEmail = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    await axios.post(`${BASE_BACKEND_URL}/register/email`, {
      username: name,
      email: email,
      password: password,
    });

    // ユーザーに認証メールが送信されたことを知らせるメッセージを表示
    alert("登録が成功しました！認証メールをご確認ください。");
  } catch (error) {
    throw new Error("登録に失敗しました。もう一度お試しください。");
  }
};

export default registerWithEmail;
