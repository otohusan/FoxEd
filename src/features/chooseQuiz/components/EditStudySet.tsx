import React, { useState } from "react";
import "../style/EditStudySet.css";
import { sendStudySetUpdate } from "../../../api";

type EditStudySetProps = {
  studySetId: string;
  prevTitle: string;
  prevDescription: string;
  onCancel: (e: React.MouseEvent) => void;
  onNewStudySet: () => void;
};

const EditStudySet: React.FC<EditStudySetProps> = ({
  studySetId,
  prevTitle,
  prevDescription,
  onCancel,
  onNewStudySet,
}) => {
  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);

  // 保存のロジック
  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (title == prevTitle && description == prevDescription) {
        alert("入力内容が変わっていません");
        return;
      }
      await sendStudySetUpdate(studySetId, { title, description });
      // studySetがstateで持ててないから明示的に更新
      onNewStudySet();
      onCancel(e);
      alert("学習セットが更新されました");
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
