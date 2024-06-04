import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../../type";
import { jwtDecode } from "jwt-decode";

type AuthContextProps = {
  children: React.ReactNode;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => void;
}

// 初回レンダーの際のみにcontextを作成するために、外で定義
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  // APIを叩いてuser情報を取得
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          // NOTICE: テスト段階だから特定のIDを取得してる
          // 本来はJWTかクッキーにIDを置いといて取得する？
          `${BASE_BACKEND_URL}users/3db2452d-53ed-4df8-b483-eb4dc4cc4ffa`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [BASE_BACKEND_URL]);

  // ログイン用の関数
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_BACKEND_URL}login/email`, {
        email,
        password,
      });
      const token = response.data.token; // JWTトークンを取得
      const decoded: any = jwtDecode(token); // JWTトークンをデコード
      console.log(decoded); // デバッグのためにデコード結果をログ出力

      const user: User = {
        ID: decoded.userID, // 正しいキー名を使用
        name: decoded.name,
        email: decoded.email,
        createdAt: decoded.createdAt,
      };
      setUser(user);
      // 必要ならローカルストレージにトークンを保存
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to login", error);
      alert("ログインに失敗しました");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loginWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
