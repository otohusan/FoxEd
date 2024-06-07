import React from "react";
import { useQuizContext } from "../../../components/quiz/useQuizContext";

type OwnerQuizMenuProps = {
  QuizID: string;
};

const OwnerQuizMenu: React.FC<OwnerQuizMenuProps> = ({ QuizID }) => {
  const { deleteQuiz } = useQuizContext();

  const handleEditQuiz = (id: string) => {
    console.log(`Editing quiz with ID: ${id}`);
    // 編集処理のロジックをここに追加
  };

  const handleDeleteQuiz = (id: string) => {
    const isConfirmed = window.confirm("クイズを削除しますか？");
    if (isConfirmed) {
      deleteQuiz(id);
    }
  };

  return (
    <div>
      <button onClick={() => handleEditQuiz(QuizID)}>編集</button>
      <button onClick={() => handleDeleteQuiz(QuizID)}>削除</button>
    </div>
  );
};

export default OwnerQuizMenu;
