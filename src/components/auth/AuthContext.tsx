import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { StudySet, User } from "../../../type";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  getTokenWithEmail,
  getUserFavorite,
  getUserInfoWithToken,
} from "../../api";
import getUserStudySets from "../../api/studySet/getUserStudySets";

type AuthContextProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userStudySets: StudySet[] | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => void;
  logout: () => void;
  favoriteItems: StudySet[] | null;
  toggleFavorite: (
    studySet: StudySet,
    action: "add" | "remove"
  ) => Promise<void>;
  setFavoriteItems: React.Dispatch<React.SetStateAction<StudySet[] | null>>;
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
  const [favoriteItems, setFavoriteItems] = useState<StudySet[] | null>([]);
  const [userStudySets, setUserStudySets] = useState<StudySet[] | null>([]);

  const BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  // APIを叩いてuser情報を取得
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // トークンが空だったら何もしない
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

        // 取得したトークンから、ユーザー情報を取得して割り当て
        const userInfo = await getUserInfoWithToken(token);
        setUser(userInfo);

        setUserStudySets(await getUserStudySets(userInfo.ID));

        // お気に入り学習セットを取得
        setFavoriteItems(await getUserFavorite(userInfo.ID));
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
      // トークンを取得して、ローカルストレージに保存
      const token = await getTokenWithEmail(email, password);
      localStorage.setItem("token", token);

      // 取得したトークンから、ユーザー情報を取得して割り当て
      const userInfo = await getUserInfoWithToken(token);
      setUser(userInfo);

      setUserStudySets(await getUserStudySets(userInfo.ID));

      // お気に入り学習セットを取得
      setFavoriteItems(await getUserFavorite(userInfo.ID));

      // ホームに遷移
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  // ログアウト用の関数
  const logout = () => {
    if (!user) {
      alert("ログアウト済みです");
      return;
    }
    localStorage.removeItem("token");
    setUser(null);
    setFavoriteItems(null);
  };

  const toggleFavorite = async (
    studySet: StudySet,
    action: "add" | "remove"
  ) => {
    if (!user) {
      alert("ログインが必要です");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("この行動は行えません");
      return;
    }

    try {
      // 追加の場合
      if (action === "add") {
        await axios.post(
          `${BASE_BACKEND_URL}/favorites/user/${user?.ID}/studyset/${studySet.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoriteItems((prevItems) => [...(prevItems || []), studySet]);
      }
      // 削除の場合
      else if (action === "remove") {
        await axios.delete(
          `${BASE_BACKEND_URL}/favorites/user/${user?.ID}/studyset/${studySet.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavoriteItems((prevItems) =>
          (prevItems || []).filter((item) => item.id !== studySet.id)
        );
      }
    } catch (error) {
      alert("行動が失敗しました");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userStudySets,
        loading,
        loginWithEmail,
        logout,
        favoriteItems,
        toggleFavorite,
        setFavoriteItems,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
