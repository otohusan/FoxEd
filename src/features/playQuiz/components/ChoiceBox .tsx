import "../style/choiceBox.css";

interface ChoiceBoxProps {
  choiceValue: string;
  answer: string;
  quizSize: number;
  quizIndex: number;
  feedbackFunc: (answer: string, clickedChoice: string) => void;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
}

function ChoiceBox({
  choiceValue,
  feedbackFunc,
  answer,
  setQuizIndex,
  quizIndex,
  quizSize,
}: ChoiceBoxProps) {
  //何秒、フィードバックを表示するか決める変数
  const TimeDuration: number = 1500;

  //クイズインデックスを更新する関数
  function updateQuizIndex() {
    const nextIndex = quizIndex === quizSize - 1 ? 0 : quizIndex + 1;
    setTimeout(() => setQuizIndex(nextIndex), TimeDuration);
  }

  //選択肢がクリックされた時に発動する関数
  function handleClick(answer: string, choiceValue: string) {
    // フィードバック関数を呼び出す
    feedbackFunc(answer, choiceValue);

    //クイズを更新する
    updateQuizIndex();
  }

  return (
    <div className="container" onClick={() => handleClick(answer, choiceValue)}>
      <div className="choice_value">{choiceValue}</div>
    </div>
  );
}

export default ChoiceBox;
