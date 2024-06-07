import React, { useState } from "react";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import EditQuiz from "./EditQuiz";
import "../style/OwnerQuizMenu.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { sendQuizDelete } from "../../../api";

type OwnerQuizMenuProps = {
  QuizID: string;
  prevQuestion: string;
  prevAnswer: string;
};

const OwnerQuizMenu: React.FC<OwnerQuizMenuProps> = ({
  QuizID,
  prevQuestion,
  prevAnswer,
}) => {
  const { deleteQuiz } = useQuizContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditQuiz = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const VITE_BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL;
  // 削除用のロジック
  const handleDeleteQuiz = (id: string) => {
    const isConfirmed = window.confirm("クイズを削除しますか？");
    if (isConfirmed) {
      try {
        // DBの更新が成功したらstateの更新
        sendQuizDelete(`${VITE_BASE_BACKEND_URL}/flashcards/${QuizID}`).then(
          () => {
            deleteQuiz(id);
          }
        );
      } catch (error) {
        alert("クイズの削除に失敗しました");
        return;
      }
    }
  };

  const ICONSIZE = "20px";

  return (
    <div className="owner-quiz-menu-container">
      <button onClick={() => handleEditQuiz()}>
        <FiEdit size={ICONSIZE} />
      </button>
      <button onClick={() => handleDeleteQuiz(QuizID)}>
        <RiDeleteBin6Line size={ICONSIZE} />
      </button>
      {isEditing && (
        <EditQuiz
          quizId={QuizID}
          prevQuestion={prevQuestion}
          prevAnswer={prevAnswer}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default OwnerQuizMenu;
