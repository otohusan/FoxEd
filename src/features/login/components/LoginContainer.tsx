import { useState } from "react";
import { useAuth } from "../../../components/auth/useAuth";
import {
  GoogleLoginContainer,
  HeadDataHelmet,
  InputField,
} from "../../../components";
import "../style/LoginContainer.css";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  // フォームの入力が全てあるかどうかを確認
  const isFormValid =
    email !== "" &&
    password !== "" &&
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>_-]{8,}$/.test(
      password
    );

  return (
    <div>
      <HeadDataHelmet pageTitle="ログインページ" />
      <main>
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h1 className="login-title">Konwalk</h1>
            <InputField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="メールアドレス"
              autocomplete="email"
            />
            <InputField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワード"
              required
              autocomplete="current-password"
            />
            <button
              type="submit"
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              ログイン
            </button>

            {/* これがGoogleのログイン */}
            <GoogleLoginContainer text="Googleでログイン" />

            <p className="redirect-register-message">
              ユーザ新規登録は
              <a
                className="redirect-register-message-url"
                onClick={() => {
                  navigate("/Register");
                }}
              >
                こちら
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginContainer;
