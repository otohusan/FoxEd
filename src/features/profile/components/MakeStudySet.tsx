import { useState } from "react";
import "../style/MakeStudySet.css";
import { postStudySet } from "../../../api";
import { useQuizContext } from "../../../components/quiz/useQuizContext";
import { useAuth } from "../../../components/auth/useAuth";
import { useNavigate } from "react-router-dom";

type MakeStudySetProps = {
  studySetQuantity: number | undefined;
};

function MakeStudySet({ studySetQuantity }: MakeStudySetProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 作成後にクイズページに遷移するために使う
  const { setCurrentQuizIndex, setQuizFormat } = useQuizContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  // 学習セットの作成を行い、その学習セットのページに遷移する
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 管理者は無制限で作れるようにしてる
    if (
      user?.ID != import.meta.env.VITE_ADMIN_ID &&
      studySetQuantity &&
      studySetQuantity >= 10
    ) {
      alert("学習セットは10個までしか作れないよ");
      return;
    }

    try {
      // 学習セット作成して、そのIDをうけとる
      const studySetID = await postStudySet({
        title: title,
        description: description,
      });

      setCurrentQuizIndex(0);
      setQuizFormat({
        id: studySetID,
        user_id: user?.ID,
        label: title,
        description: description,
        body: [],
        created_at: "",
        updated_at: "",
      });

      setTitle("");
      setDescription("");

      navigate("/PrepareQuiz");
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
