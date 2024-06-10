import React, { useState } from "react";
import EditStudySet from "./EditStudySet";
import "../style/OwnerStudySetMenu.css";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { sendStudySetDelete } from "../../../api";

type OwnerStudySetMenuProps = {
  studySetID: string;
  prevTitle: string;
  prevDescription: string;
  onNewStudySet: () => void;
};

const OwnerStudySetMenu: React.FC<OwnerStudySetMenuProps> = ({
  studySetID,
  prevTitle,
  prevDescription,
  onNewStudySet,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditStudySet = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  // 削除用のロジック
  const handleDeleteStudySet = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const isConfirmed = window.confirm("学習セットを削除しますか？");
    if (isConfirmed) {
      try {
        // DBの更新が成功したらstateの更新
        await sendStudySetDelete(studySetID);
        // studySetがstateで持ててないから明示的に更新
        onNewStudySet();
        alert("学習セットが削除されました");
      } catch (error) {
        alert(error);
        return;
      }
    }
  };

  const ICONSIZE = "20px";

  return (
    <div className="owner-study-set-menu-container">
      <button onClick={handleEditStudySet}>
        <FiEdit size={ICONSIZE} />
      </button>
      <button onClick={(e) => handleDeleteStudySet(e)}>
        <RiDeleteBin6Line size={ICONSIZE} />
      </button>
      {isEditing && (
        <EditStudySet
          studySetId={studySetID}
          prevTitle={prevTitle}
          prevDescription={prevDescription}
          onCancel={handleCancelEdit}
          onNewStudySet={onNewStudySet}
        />
      )}
    </div>
  );
};

export default OwnerStudySetMenu;
