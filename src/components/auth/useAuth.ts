import { useContext } from "react";
import { StudySet, User } from "../../../type";
import { AuthContext } from "./AuthContext";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => void;
  logout: () => void;
  favoriteItems: StudySet[] | null;
  toggleFavorite: (
    studySet: StudySet,
    action: "add" | "remove"
  ) => Promise<void>;
  setFavoriteItems: React.Dispatch<React.SetStateAction<StudySet[] | null>>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
