import React, { useState, useEffect } from "react";

import "../style/AppSettings.css";
import { Header } from "../../../components";

function AppSettings() {
  const [name, setName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameExist, setIsUsernameExist] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // ここで設定を保存する処理を実装
      // 例: await updateUserName(name);
      console.log("設定を保存:", { name });
      setIsUpdated(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
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

  useEffect(() => {
    setIsFormValid(name !== "");
  }, [name]);

  if (isLoading) {
    return <div>Loading...</div>; // またはLoadingコンポーネントを使用
  }

  return (
    <div className="app-settings">
      <Header HeaderTitle="Settings" />
      {isUpdated && <p className="update-message">設定が更新されました！</p>}
      {!isUpdated && (
        <form onSubmit={handleSubmit}>
          {isUsernameExist && (
            <p className="error-message">
              このユーザー名は既に使用されています
            </p>
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
      )}
    </div>
  );
}

export default AppSettings;
