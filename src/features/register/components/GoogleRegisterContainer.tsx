import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import "../style/GoogleRegisterContainer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/auth/useAuth";
import { getUserInfoWithToken } from "../../../api";

function GoogleRegisterContainer() {
  const navigate = useNavigate();

  const { setUser, setFavoriteItems } = useAuth();

  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  // 取得したアクセストークンをバックエンドに送る
  // resにはJWTトークンが含まれることを想定
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // トークンを取得
        const response = await axios.post(
          `${VITE_BASE_BACKEND_URL}/auth/google`,
          {
            access_token: tokenResponse.access_token,
          }
        );
        // トークンをローカルストレージに保存
        localStorage.setItem("token", response.data.token);

        // 取得したトークンから、ユーザー情報を取得して割り当て
        const userInfo = await getUserInfoWithToken(response.data.token);
        setUser(userInfo);

        // お気に入りの学習セットを取得
        const favoritesResponse = await axios.get(
          `${VITE_BASE_BACKEND_URL}/users/${userInfo.ID}/favorite`
        );

        setFavoriteItems(favoritesResponse.data);

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
