import React, { useEffect, useState } from "react";

import { InputField } from "../../../components";
import registerWithEmail from "../api/registerWithEmail";
import "../style/MainRegister.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const MainRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerWithEmail(name, email, password);
      setIsRegistered(true);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // フォームの入力が全てあるかどうかを確認
    setIsFormValid(
      name !== "" &&
        email !== "" &&
        password !== "" &&
        /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
    );
  }, [name, email, password]);

  // 更新中はこれを表示
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      {isRegistered && (
        <p className="isRegisteredMessage">
          入力されたメールアドレスにリンクを送信しました！
          クリックして本登録を完了させてね
        </p>
      )}
      {!isRegistered && (
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Konwalk</h1>
          <InputField
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="名前"
          />
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
          <button type="submit" disabled={!isFormValid} onClick={handleSubmit}>
            登録
          </button>

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
