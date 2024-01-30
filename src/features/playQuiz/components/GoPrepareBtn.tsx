import "../style/goPrepareBtn.css";
import { useNavigate } from "react-router-dom";
import { FaRegLightbulb } from "react-icons/fa6";

type GoPrepareBtnProps = {
  stopVideo: () => void;
};

function GoPrepareBtn({ stopVideo }: GoPrepareBtnProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/PrepareQuiz");
    stopVideo();
  };

  return (
    <div className="playQuiz-GoPrepareBtn" onClick={handleClick}>
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
    </div>
  );
}

export default GoPrepareBtn;
