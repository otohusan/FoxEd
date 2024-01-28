import "../style/goReviewBtn.css";
import { useNavigate } from "react-router-dom";
import { GoNote } from "react-icons/go";

type GoReviewBtnProps = {
  stopVideo: () => void;
};

function GoReviewBtn({ stopVideo }: GoReviewBtnProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ReviewQuiz");
    stopVideo();
  };

  return (
    <div className="playQuiz-GoReviewBtn" onClick={handleClick}>
      <GoNote
        size={30}
        style={{
          filter:
            "drop-shadow(0px 1px 0px #f09038) drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.5)",
        }}
      />
      <div
        className="playQuiz-GoReviewBtnLabel"
        style={{
          filter:
            "drop-shadow(0px 1px 0px #f09038) drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.5))",
        }}
      >
        Review
      </div>
    </div>
  );
}

export default GoReviewBtn;
