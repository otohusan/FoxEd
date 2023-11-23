import "../style/goReviewBtn.css";
import { useNavigate } from "react-router-dom";
import { GoNote } from "react-icons/go";

function GoReviewBtn(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ReviewQuiz");
  };

  return (
    <div className="playQuiz-GoReviewBtn" onClick={handleClick}>
      <GoNote size={35} />
      <div className="playQuiz-GoReviewBtnLabel">Review</div>
    </div>
  );
}

export default GoReviewBtn;
