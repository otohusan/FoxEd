import { useState } from "react";

import {
  GoogleLoginContainer,
  HeadDataHelmet,
  InputField,
} from "../../../components";
import registerWithEmail from "../api/registerWithEmail";
import "../style/MainRegister.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MainRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isFormValid, setIsFormValid] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isUsernameExist, setIsUsernameExist] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerWithEmail(name, email, password);
      setIsRegistered(true);
    } catch (error: unknown) {
      // Error型だった場合のみ行う
      if (error instanceof Error) {
        // エラー文によって行動変える
        if (error.message.includes("メールアドレス")) {
          setIsEmailExist(true);
        }
        if (error.message.includes("ユーザー名")) {
          setIsUsernameExist(true);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 入力内容が適切か判定する
  const isFormValid =
    name !== "" &&
    email !== "" &&
    password !== "" &&
    /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*(),.?":{}|<>_-]{8,}$/.test(
      password
    );

  // 更新中はこれを表示
  if (isLoading) {
    return <Loading />;
  }

  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div className="login-container">
      <HeadDataHelmet pageTitle="新規登録ページ" />
      {isRegistered && (
        <p className="isRegisteredMessage">
          入力されたメールアドレスにリンクを送信しました！
          クリックして本登録を完了させてね
        </p>
      )}
      {!isRegistered && (
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Konwalk</h1>
          {isUsernameExist && (
            <p className="register-error-message">
              このユーザ名は既に使用されいるよ
            </p>
          )}
          <InputField
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsUsernameExist(false);
            }}
            required
            placeholder="名前"
            autocomplete="username"
          />
          {isEmailExist && (
            <p className="register-error-message">
              このメールアドレスは既に使用されいるよ
            </p>
          )}
          <InputField
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailExist(false);
            }}
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
            autocomplete="new-password"
          />
          <button type="submit" disabled={!isFormValid} onClick={handleSubmit}>
            登録
          </button>

          {/* これがGoogleのログイン */}
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLoginContainer text="Googleで新規登録" />
          </GoogleOAuthProvider>

          <p className="redirect-login-message">
            登録済みの方は
            <a
              className="redirect-login-message-url"
              onClick={() => {
                navigate("/Login");
              }}
            >
              こちら
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default MainRegister;
