import { Link } from "react-router-dom";
import "../style/SelectQuizMode.css";

function SelectQuizModeContainer() {
  return (
    <div className="SelectQuizModeContainer">
      <Link to={"/"} className="SelectMode">
        歩いて使う
      </Link>
      <div className="SelectMode-hr-line"></div>
      <Link to={"/"} className="SelectMode">
        普通に使う
      </Link>
    </div>
  );
}

export default SelectQuizModeContainer;
