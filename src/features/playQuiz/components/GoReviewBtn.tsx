import "../style/goReviewBtn.css";
import { useNavigate } from "react-router-dom";

function GoReviewBtn(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ReviewQuiz");
  };

  return (
    <div className="playQuiz-GoReviewBtn" onClick={handleClick}>
      GoReviewBtn
    </div>
  );
}

export default GoReviewBtn;
