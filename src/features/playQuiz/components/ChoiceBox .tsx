import "../style/choiceBox.css";
import { hideComponentForFixedTime } from "../api";
import { returnNextQuizIndex } from "../../../api";

interface ChoiceBoxProps {
  choiceValue: string;
  answer: string;
  quizSize: number;
  quizIndex: number;
  feedbackFunc: (answer: string, clickedChoice: string) => void;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  setSolvedQuizzes: React.Dispatch<React.SetStateAction<number>>;
  //選択肢を表示するか、フィードバックを表示するかを操作する関数
  setWithinAnswer: React.Dispatch<React.SetStateAction<boolean>>;
  // 間違った問題の更新
  setReviewQuizzes: React.Dispatch<React.SetStateAction<number[]>>;
}

function ChoiceBox({
  choiceValue,
  feedbackFunc,
  answer,
  setQuizIndex,
  setSolvedQuizzes,
  setWithinAnswer,
  quizIndex,
  quizSize,
  setReviewQuizzes,
}: ChoiceBoxProps) {
  //何秒、フィードバックを表示するか決める変数
  const timeDuration: number = 1700;

  //クイズインデックスを更新する関数
  function updateQuizIndex() {
    //フィードバックが表示されている間の後に、値を更新して、次の問題に進む

    setTimeout(() => {
      setQuizIndex(returnNextQuizIndex(quizIndex, quizSize, 1));
      setSolvedQuizzes((prevCount) => prevCount + 1);
    }, timeDuration);
  }

  //選択肢がクリックされた時に発動する関数
  function handleClick(answer: string, choiceValue: string) {
    // フィードバック関数を呼び出す
    feedbackFunc(answer, choiceValue);

    //クイズを更新する
    updateQuizIndex();

    //選択肢を隠す
    hideComponentForFixedTime(timeDuration, setWithinAnswer);

    // 間違った問題をストック
    if (answer !== choiceValue) {
      setReviewQuizzes((prevValues) => {
        // すでに間違ってる場合はそのまま返す
        if (prevValues.includes(quizIndex)) return [...prevValues];
        // 付け足して返す
        return [...prevValues, quizIndex];
      });
    }
  }

  return (
    <div className="container" onClick={() => handleClick(answer, choiceValue)}>
      <div className="choice_value">{choiceValue}</div>
    </div>
  );
}

export default ChoiceBox;
