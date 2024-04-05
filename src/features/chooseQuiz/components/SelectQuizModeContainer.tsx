import { Link } from "react-router-dom";

function SelectQuizModeContainer() {
  return (
    <div className="SelectQuizModeContainer">
      <Link to={"/"} className="SelectMode">
        歩く時の
      </Link>
      <Link to={"/"} className="SelectMode">
        普通の
      </Link>
    </div>
  );
}

export default SelectQuizModeContainer;
