import { useState } from "react";
import "../style/MakeStudySet.css";
import { postStudySet } from "../../../api";

type MakeStudySetProps = {
  onNewStudySet: () => void;
  studySetQuantity: number | undefined;
};

function MakeStudySet({ onNewStudySet, studySetQuantity }: MakeStudySetProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // NOTICE:
  // 学習セット作成時にすぐ勉強ページに遷移させたかった
  // ただsyudySetのIDはDBで自動生成されることが問題で
  // フロントのみで対応しようとなると難しいので保留した
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studySetQuantity && studySetQuantity >= 5) {
      alert("学習セットは5個までしか作れないよ");
      return;
    }

    try {
      await postStudySet({ title: title, description: description });

      // 新しい学習セットを親コンポーネントに通知して再度データを取得
      onNewStudySet();

      setTitle("");
      setDescription("");
      alert("学習セットが作成されました");
    } catch (error) {
      alert(error);
    }
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
