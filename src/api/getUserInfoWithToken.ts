import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User } from "../../type";

async function getUserInfoWithToken(token: string): Promise<User> {
  type DecodedToken = {
    userID: string;
    exp: number;
    // 他の必要なフィールドがあれば追加
  };

  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const decoded: DecodedToken = jwtDecode(token); // JWTトークンをデコード

  const userInfoResponse = await axios.get(
    `${VITE_BASE_BACKEND_URL}/users/${decoded.userID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const userInfo = userInfoResponse.data;

  // NOTICE: jsonが大文字で返ってきてる
  const user = {
    ID: userInfo.ID, // 正しいキー名を使用
    name: userInfo.Name,
    email: userInfo.Email,
    createdAt: userInfo.CreatedAt,
  };

  return user;
}

export default getUserInfoWithToken;
