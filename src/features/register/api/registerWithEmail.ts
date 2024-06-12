import axios from "axios";

// BASE_BACKEND_URLをインポートまたは定義してください
const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

// メールアドレスの存在を確認する関数
const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/users/email-exists`,
      {
        email: email,
      }
    );
    return response.data.result; // { result: true } 形式のレスポンスを期待
  } catch (error) {
    console.log(error);
    throw new Error("メールアドレスの確認に失敗しました。");
  }
};

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

// 新規登録用の関数
const registerWithEmail = async (
  name: string,
  email: string,
  password: string
): Promise<void> => {
  try {
    // メールアドレスとユーザ名の存在を確認
    const emailExists = await checkEmailExists(email);
    const usernameExists = await checkUsernameExists(name);

    if (emailExists && usernameExists) {
      throw new Error("ユーザ名とメールアドレスは使用されています");
    }

    if (emailExists) {
      throw new Error("メールアドレスは既に使用されています");
    }
    if (usernameExists) {
      throw new Error("ユーザー名は既に使用されています");
    }

    // 新規登録を実行
    await axios.post(`${BASE_BACKEND_URL}/register/email`, {
      username: name,
      email: email,
      password: password,
    });

    // ユーザーに認証メールが送信されたことを知らせるメッセージを表示
    alert("登録が成功しました！認証メールをご確認ください。");
  } catch (error) {
    alert(error);
    throw error;
  }
};

export default registerWithEmail;
