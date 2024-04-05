import { Link } from "react-router-dom";
import "../style/SelectQuizMode.css";

type SelectQuizModeContainerProps = {
  x: number;
  y: number;
};

function SelectQuizModeContainer(props: SelectQuizModeContainerProps) {
  return (
    <div
      className="SelectQuizModeContainer"
      style={{ top: `${props.y}px`, left: `${props.x}px` }}
    >
      <Link to={"/PlayQuiz"} className="SelectMode">
        歩いて覚える
      </Link>
      <div className="SelectMode-hr-line"></div>
      <Link to={"/PrepareQuiz"} className="SelectMode">
        単語帳で覚える
      </Link>
    </div>
  );
}

export default SelectQuizModeContainer;
