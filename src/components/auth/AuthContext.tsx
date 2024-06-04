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

  // APIを叩いてuser情報を取得
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://your-backend-url/protected", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
