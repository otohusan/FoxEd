import "../style/choiceBox.css";
import { hideComponentForFixedTime } from "../api";

interface ChoiceBoxProps {
  choiceValue: string;
  answer: string;
  quizSize: number;
  quizIndex: number;
  feedbackFunc: (answer: string, clickedChoice: string) => void;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  //選択肢を表示するか、フィードバックを表示するかを操作する関数
  setWithinAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChoiceBox({
  choiceValue,
  feedbackFunc,
  answer,
  setQuizIndex,
  setWithinAnswer,
  quizIndex,
  quizSize,
}: ChoiceBoxProps) {
  //何秒、フィードバックを表示するか決める変数
  const TimeDuration: number = 1200;

  //クイズインデックスを更新する関数
  function updateQuizIndex() {
    // 最後の問題になった場合は0をSetしてエラーを防ぐ
    const nextIndex = quizIndex === quizSize - 1 ? 0 : quizIndex + 1;
    //フィードバックが表示されている間の後に、値を更新して、次の問題に進む
    setTimeout(() => setQuizIndex(nextIndex), TimeDuration);
  }

  //選択肢がクリックされた時に発動する関数
  function handleClick(answer: string, choiceValue: string) {
    // フィードバック関数を呼び出す
    feedbackFunc(answer, choiceValue);

    //クイズを更新する
    updateQuizIndex();

    //選択肢を隠す
    hideComponentForFixedTime(TimeDuration, setWithinAnswer);
  }

  return (
    <div className="container" onClick={() => handleClick(answer, choiceValue)}>
      <div className="choice_value">{choiceValue}</div>
    </div>
  );
}

export default ChoiceBox;
