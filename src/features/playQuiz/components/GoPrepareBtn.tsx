import "../style/goPrepareBtn.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { Link } from "react-router-dom";

type GoPrepareBtnProps = {
  stopVideo: () => void;
};

function GoPrepareBtn({ stopVideo }: GoPrepareBtnProps): JSX.Element {
  const handleClick = () => {
    stopVideo();
  };

  return (
    <Link
      to={"/PrepareQuiz"}
      className="playQuiz-GoPrepareBtn"
      onClick={handleClick}
    >
      <FaRegLightbulb
        size={30}
        style={{
          filter:
            "drop-shadow(0px 1px 0px #f09038) drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.5)",
        }}
      />
      <div
        className="playQuiz-GoPrepareBtnLabel"
        style={{
          filter:
            "drop-shadow(0px 1px 0px #f09038) drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.5))",
        }}
      >
        <div style={{ fontSize: "0.8em" }}>予習</div>
      </div>
    </Link>
  );
}

export default GoPrepareBtn;
