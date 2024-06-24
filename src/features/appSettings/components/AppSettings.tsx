import React, { useState, useMemo } from "react";
import axios from "axios";
import "../style/AppSettings.css";
import { Header } from "../../../components";
import { checkUsernameExists } from "../../../api";
import { useAuth } from "../../../components/auth/useAuth";
import LoginPrompt from "../../../components/LoginPrompt";
import DarkModeToggle from "../../../components/DarkModeToggle";

const updateUserName = async (userID: string, name: string, token: string) => {
  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  const response = await axios.put(
    `${BASE_BACKEND_URL}/users/${userID}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

function AppSettings() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameExist, setIsUsernameExist] = useState(false);

  const { user, setUser } = useAuth();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 名前の重複チェック
      const usernameExists = await checkUsernameExists(name);
      if (usernameExists) {
        setIsUsernameExist(true);
        alert("このユーザー名は既に使用されています");
        return;
      }

      // ここで設定を保存する処理を実装
      if (user && token) {
        await updateUserName(user.ID, name, token);
        setUser({ ...user, name: name });
      } else {
        alert("ユーザー情報が取得できませんでした");
      }

      alert("更新が完了しました");
    } catch (error: unknown) {
      alert("更新に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  // stateに変化がある度に確認
  const isFormValid = useMemo(() => name !== "", [name]);

  if (!user) {
    return (
      <div className="settings-login-prompt">
        <LoginPrompt promptText="自作の学習セットを作ってみよう" />
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>; // またはLoadingコンポーネントを使用
  }

  return (
    <div className="app-settings">
      <Header HeaderTitle="Settings" />
      <form onSubmit={handleSubmit}>
        {isUsernameExist && (
          <p className="error-message">このユーザー名は既に使用されています</p>
        )}
        <div className="form-group">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsUsernameExist(false);
            }}
            required
            placeholder="名前を入力"
            autoComplete="username"
          />
        </div>
        <button type="submit" disabled={!isFormValid}>
          設定を保存
        </button>
      </form>
      <DarkModeToggle />
    </div>
  );
}

export default AppSettings;
