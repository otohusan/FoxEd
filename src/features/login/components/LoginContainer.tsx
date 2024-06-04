import React, { useEffect, useState } from "react";
import { useAuth } from "../../../components/auth/useAuth";
import { InputField } from "../../../components";
import "../style/LoginContainer.css";

const LoginContainer = () => {
  const { loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  useEffect(() => {
    // フォームの入力が全てあるかどうかを確認
    setIsFormValid(email !== "" && password !== "");
  }, [email, password]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Konwalk</h1>
        <InputField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="メールアドレス"
        />
        <InputField
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
          required
        />
        <button type="submit" disabled={!isFormValid}>
          ログイン
        </button>
      </form>
    </div>
  );
};

export default LoginContainer;
