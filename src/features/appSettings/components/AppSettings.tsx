import React, { useState, useMemo } from "react";

import "../style/AppSettings.css";
import { Header } from "../../../components";
import { checkUsernameExists } from "../../../api";
import { useAuth } from "../../../components/auth/useAuth";
import LoginPrompt from "../../../components/LoginPrompt";

function AppSettings() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameExist, setIsUsernameExist] = useState(false);

  const { user } = useAuth();

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
      // 例: await updateUserName(name);

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
    </div>
  );
}

export default AppSettings;
