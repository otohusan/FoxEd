import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import "../style/GoogleRegisterContainer.css";
import axios from "axios";

function GoogleRegisterContainer() {
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
        console.log(response.data);
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
