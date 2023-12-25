import "../style/PrepareMenus.css";
import SpeakWordBtn from "./SpeakWordBtn";
import { FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type PrepareQuizMenuProps = {
  QuizName: string;
};

function PrepareQuizMenu({ QuizName }: PrepareQuizMenuProps) {
  const navigate = useNavigate();
  return (
    <div className="PrepareMenus">
      <div className="PrepareQuizSpeakBtn">
        <SpeakWordBtn questionWord={QuizName} />
      </div>
      <div className="PrepareQuizPlayBtn" onClick={() => navigate("/")}>
        <FaPlay />
      </div>
    </div>
  );
}

export default PrepareQuizMenu;
