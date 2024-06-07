import React, { useState } from "react";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import EditQuiz from "./EditQuiz";

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

  // 削除用のロジック
  const handleDeleteQuiz = (id: string) => {
    const isConfirmed = window.confirm("クイズを削除しますか？");
    if (isConfirmed) {
      deleteQuiz(id);
    }
  };

  return (
    <div>
      <button onClick={() => handleEditQuiz()}>編集</button>
      <button onClick={() => handleDeleteQuiz(QuizID)}>削除</button>
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
