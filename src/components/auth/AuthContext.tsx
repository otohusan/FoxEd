import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../../type";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

type AuthContextProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => void;
};

type DecodedToken = {
  userID: string;
  exp: number;
  // 他の必要なフィールドがあれば追加
};

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
        // トークンが空だったら何もしない
        // NOTICE: 実際はcookieに保存したい
        const token = localStorage.getItem("token");
        if (token === null) {
          return;
        }

        // JWTトークンをデコード
        const decoded: DecodedToken = jwtDecode(token);

        // 期限切れの場合は何もしない
        if (decoded.exp <= Date.now() / 1000) {
          return;
        }

        // ユーザ情報を取得
        const response = await axios.get(
          `${BASE_BACKEND_URL}/users/${decoded.userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userInfo = response.data;

        const user = {
          ID: userInfo.ID,
          name: userInfo.Name,
          email: userInfo.Email,
          createdAt: userInfo.CreatedAt,
        };
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [BASE_BACKEND_URL]);

  // ログイン成功したらページ移動させるため
  const navigate = useNavigate();

  // ログイン用の関数
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE_BACKEND_URL}/users/login/email`,
        {
          Email: email,
          Password: password,
        }
      );
      const token = response.data.token; // JWTトークンを取得
      const decoded: DecodedToken = jwtDecode(token); // JWTトークンをデコード

      const userInfoResponse = await axios.get(
        `${BASE_BACKEND_URL}/users/${decoded.userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userInfo = userInfoResponse.data;

      // NOTICE: jsonが大文字で返ってきてる
      const user = {
        ID: userInfo.ID, // 正しいキー名を使用
        name: userInfo.Name,
        email: userInfo.Email,
        createdAt: userInfo.CreatedAt,
      };
      setUser(user);
      // 必要ならローカルストレージにトークンを保存
      localStorage.setItem("token", token);

      // ホームに遷移
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loginWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
