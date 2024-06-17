import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import "../style/GoogleRegisterContainer.css";

function GoogleRegisterContainer() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
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
