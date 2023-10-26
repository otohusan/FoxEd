import "../style/choiceBox.css";

interface ChoiceBoxProps {
  feedbackFunc: (answer: string, clickedChoice: string) => void;
}

function ChoiceBox({ feedbackFunc }: ChoiceBoxProps) {
  return (
    <div className="container" onClick={() => feedbackFunc("s", "b")}>
      <div className="choice_value">難易度の高い文字数</div>
    </div>
  );
}

export default ChoiceBox;
