import axios from "axios";
import { User } from "../../../type";

async function handleCopy(
  e: React.MouseEvent,
  title: string,
  description: string,
  studySetId: string,
  user: User,
  userStudySetQuantity: number
) {
  e.stopPropagation();
  e.preventDefault();

  if (!user) {
    alert("ログインが必要です");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("ログインが必要です");
    return;
  }

  // 管理者は無制限で作れるようにしてる
  if (
    user.ID != import.meta.env.VITE_ADMIN_ID &&
    userStudySetQuantity &&
    userStudySetQuantity >= 10
  ) {
    alert("学習セットは10個までしか作れないよ");
    return;
  }

  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;

  const isConfirmed = window.confirm("学習セットをコピーしますか？");
  if (!isConfirmed) {
    return;
  }

  try {
    await axios.post(
      `${VITE_BASE_BACKEND_URL}/studysets/copy/${user.ID}`,
      {
        title: title,
        description: description,
        id: studySetId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("コピーが完了しました");
  } catch (error) {
    alert("コピーに失敗");
  }
}

export default handleCopy;
