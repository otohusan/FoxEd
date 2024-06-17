import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import "../style/GoogleRegisterContainer.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/auth/useAuth";

type DecodedToken = {
  userID: string;
  exp: number;
  // 他の必要なフィールドがあれば追加
};

function GoogleRegisterContainer() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  // 取得したアクセストークンをバックエンドに送る
  // resにはJWTトークンが含まれることを想定
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post(
          `${VITE_BASE_BACKEND_URL}/auth/google`,
          {
            access_token: tokenResponse.access_token,
          }
        );
        const token = response.data.token; // JWTトークンを取得
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
        setUser(user);
        // 必要ならローカルストレージにトークンを保存
        localStorage.setItem("token", token);

        // ホームに遷移
        navigate("/");
      } catch (error) {
        console.error("Failed to login with Google:", error);
      }
    },
  });

  return (
    <div className="google-register-container">
      <button onClick={() => login()} className="google-register-button">
        <FcGoogle size={"25px"} />
        <span>Googleで新規登録</span>
      </button>
    </div>
  );
}

export default GoogleRegisterContainer;
