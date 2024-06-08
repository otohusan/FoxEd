import React, { useState } from "react";
import "../style/EditStudySet.css";
import { sendStudySetUpdate } from "../../../api";

type EditStudySetProps = {
  studySetId: string;
  prevTitle: string;
  prevDescription: string;
  onCancel: (e: React.MouseEvent) => void;
};

const EditStudySet: React.FC<EditStudySetProps> = ({
  studySetId,
  prevTitle,
  prevDescription,
  onCancel,
}) => {
  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);

  const handleSave = async (e: React.MouseEvent) => {
    try {
      await sendStudySetUpdate(studySetId, { title, description });
      alert("学習セットが更新されました");
      onCancel(e);
    } catch (error) {
      alert("学習セットの更新に失敗しました");
    }
  };

  return (
    <div className="edit-study-set-modal">
      <div className="edit-study-set-content">
        <h2>学習セットを編集</h2>
        <div className="edit-study-set-each-content">
          <label>タイトル</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            rows={3}
            cols={50}
            placeholder="タイトルを入力"
          />
        </div>
        <div className="edit-study-set-each-content">
          <label>説明</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            cols={50}
            placeholder="説明を入力"
          />
        </div>
        <button className="saveBtn" onClick={(e) => handleSave(e)}>
          保存
        </button>
        <button onClick={onCancel}>キャンセル</button>
      </div>
    </div>
  );
};

export default EditStudySet;
