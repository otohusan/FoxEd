import React, { useEffect, useState } from "react";
import { useAuth } from "../../../components/auth/useAuth";
import {
  GoogleLoginContainer,
  HeadDataHelmet,
  InputField,
} from "../../../components";
import "../style/LoginContainer.css";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginContainer = () => {
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    // フォームの入力が全てあるかどうかを確認
    setIsFormValid(
      email !== "" &&
        password !== "" &&
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>_-]{8,}$/.test(
          password
        )
    );
  }, [email, password]);

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
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLoginContainer text="Googleでログイン" />
            </GoogleOAuthProvider>
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
