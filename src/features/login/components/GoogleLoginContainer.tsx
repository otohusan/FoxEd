import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import "../style/GoogleLoginContainer.css";

function GoogleLoginContainer() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
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
