import "../style/PrepareMenus.css";
import SpeakWordBtn from "./SpeakWordBtn";
import { PiPlayBold } from "react-icons/pi";
import { MdIosShare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type PrepareQuizMenuProps = {
  QuizName: string;
};

function PrepareQuizMenu({ QuizName }: PrepareQuizMenuProps) {
  const navigate = useNavigate();
  const iconSize: string = "22px";

  // share機能
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "FoxEd",
          text: "歩きながらも使える英単語帳",
          url: window.location.href,
        })
        .catch(() => alert("エラーが発生"));
    } else {
      alert("このブラウザではシェアを利用できません。");
    }
  };

  return (
    <div className="PrepareMenus">
      <div className="PrepareQuizSpeakBtn">
        <SpeakWordBtn questionWord={QuizName} />
      </div>
      <div className="PrepareQuizPlayBtn" onClick={() => navigate("/")}>
        {/* 大きさ整えるためにサイズ指定している */}
        <PiPlayBold size={iconSize} />
      </div>
      <div>
        <MdIosShare size={iconSize} onClick={handleShare} />
      </div>
    </div>
  );
}

export default PrepareQuizMenu;
