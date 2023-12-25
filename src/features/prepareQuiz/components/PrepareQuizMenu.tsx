import "../style/PrepareMenus.css";
import SpeakWordBtn from "./SpeakWordBtn";

type PrepareQuizMenuProps = {
  QuizName: string;
};

function PrepareQuizMenu({ QuizName }: PrepareQuizMenuProps) {
  return (
    <div className="PrepareMenus">
      <div className="PrepareQuizSpeakBtn">
        <SpeakWordBtn questionWord={QuizName} />
      </div>
      <div className="PrepareQuizMenu">...</div>
    </div>
  );
}

export default PrepareQuizMenu;
