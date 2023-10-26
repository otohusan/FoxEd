import "../style/choiceBox.css";

interface ChoiceBoxProps {
  choiceValue: string;
  answer: string;
  feedbackFunc: (answer: string, clickedChoice: string) => void;
  setQuizIndex: React.Dispatch<React.SetStateAction<number>>;
}

function ChoiceBox({
  choiceValue,
  feedbackFunc,
  answer,
  setQuizIndex,
}: ChoiceBoxProps) {
  //それぞれの関数の独立性を保持するため、ここでそれぞれ関数を発動させる
  //この関数の役割が大きくなり過ぎるのは懸念点
  function assortmentFunc(answer: string, choiceValue: string) {
    feedbackFunc(answer, choiceValue);
    setQuizIndex((prevCount) => prevCount + 1);
  }

  return (
    //クリックされると、選ばれた選択と、答えを比較してフィードバックを表示する
    <div
      className="container"
      //クリックされると正解不正解の関数を呼び出す
      onClick={() => assortmentFunc(answer, choiceValue)}
    >
      <div className="choice_value">{choiceValue}</div>
    </div>
  );
}

export default ChoiceBox;
