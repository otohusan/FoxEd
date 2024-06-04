import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../../type";

type AuthContextProps = {
  children: React.ReactNode;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
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

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
