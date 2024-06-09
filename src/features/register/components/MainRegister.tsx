import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "../../../components";
import registerWithEmail from "../api/registerWithEmail";
import "../style/MainRegister.css";

const MainRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerWithEmail(name, email, password);
    navigate("/"); // 登録後にホームページにリダイレクト
  };

  useEffect(() => {
    // フォームの入力が全てあるかどうかを確認
    setIsFormValid(name !== "" && email !== "" && password !== "");
  }, [name, email, password]);

  return (
    <div className="login-container">
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
      </form>
    </div>
  );
};

export default MainRegister;
