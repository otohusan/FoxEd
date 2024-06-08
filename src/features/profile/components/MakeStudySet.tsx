import { useState } from "react";
import "../style/MakeStudySet.css";

function MakeStudySet() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="make-study-set-container">
      <h2>学習セットを追加</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル</label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            rows={3} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="タイトルを入力"
          />
        </div>
        <div>
          <label>説明</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3} // テキストエリアの初期行数を設定
            cols={50} // テキストエリアの初期列数を設定
            placeholder="説明を入力"
          />
        </div>

        <button type="submit">学習セットを作成</button>
      </form>
    </div>
  );
}

export default MakeStudySet;
