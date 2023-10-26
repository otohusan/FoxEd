import "../style/choiceBox.css";

interface ChoiceBoxProps {
  choiceValue: string;
  answer: string;
  feedbackFunc: (answer: string, clickedChoice: string) => void;
}

function ChoiceBox({ choiceValue, feedbackFunc, answer }: ChoiceBoxProps) {
  return (
    //クリックされると、選ばれた選択と、答えを比較してフィードバックを表示する
    <div
      className="container"
      //クリックされると正解不正解の関数を呼び出す
      onClick={() => feedbackFunc(answer, choiceValue)}
    >
      <div className="choice_value">{choiceValue}</div>
    </div>
  );
}

export default ChoiceBox;
