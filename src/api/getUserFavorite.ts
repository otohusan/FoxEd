import axios from "axios";
import { StudySet } from "../../type";

async function getUserFavorite(id: string): Promise<StudySet[]> {
  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  // お気に入りの学習セットを取得
  const favoritesResponse = await axios.get(
    `${VITE_BASE_BACKEND_URL}/users/${id}/favorite`
  );

  return favoritesResponse.data;
}

export default getUserFavorite;
