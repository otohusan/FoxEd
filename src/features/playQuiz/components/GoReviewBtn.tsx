import "../style/goReviewBtn.css";
import { GoNote } from "react-icons/go";
import { Link } from "react-router-dom";

type GoReviewBtnProps = {
  stopVideo: () => void;
};

function GoReviewBtn({ stopVideo }: GoReviewBtnProps): JSX.Element {
  const handleClick = () => {
    stopVideo();
  };

  return (
    <Link
      to={"/ReviewQuiz"}
      className="playQuiz-GoReviewBtn"
      onClick={handleClick}
    >
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
        <div style={{ fontSize: "0.8em" }}>復習</div>
      </div>
    </Link>
  );
}

export default GoReviewBtn;
