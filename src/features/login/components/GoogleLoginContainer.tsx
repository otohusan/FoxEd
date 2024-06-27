import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import "../style/GoogleLoginContainer.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/auth/useAuth";
import {
  getTokenWithGoogleToken,
  getUserFavorite,
  getUserInfoWithToken,
} from "../../../api";

function GoogleLoginContainer() {
  const navigate = useNavigate();

  const { setUser, setFavoriteItems } = useAuth();

  // 取得したアクセストークンをバックエンドに送る
  // resにはJWTトークンが含まれることを想定
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // トークンを取得して、ローカルストレージに保存
        const token = await getTokenWithGoogleToken(tokenResponse.access_token);
        localStorage.setItem("token", token);

        // 取得したトークンから、ユーザー情報を取得して割り当て
        const userInfo = await getUserInfoWithToken(token);
        setUser(userInfo);

        // お気に入り学習セットを取得
        setFavoriteItems(await getUserFavorite(userInfo.ID));

        // ホームに遷移
        navigate("/");
      } catch (error) {
        alert("ログインに失敗しました");
      }
    },
  });

  return (
    <div className="google-login-container">
      <button onClick={() => login()} className="google-login-button">
        <FcGoogle size={"25px"} />
        <span>Googleでログイン</span>
      </button>
    </div>
  );
}

export default GoogleLoginContainer;
