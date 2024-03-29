import "../style/PrepareMenus.css";
import SpeakWordBtn from "./SpeakWordBtn";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdIosShare } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type PrepareQuizMenuProps = {
  QuizName: string;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  QuizIndex: number;
};

function PrepareQuizMenu({
  QuizName,
  setCurrentQuizIndex,
  QuizIndex,
}: PrepareQuizMenuProps) {
  const navigate = useNavigate();
  const iconSize: string = "22px";

  // share機能
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Konwalk",
        text: "歩く時間を無駄にしない単語帳",
        url: "https://konwalk.jp",
      });
    } else {
      alert("このブラウザではシェアを利用できません。");
    }
  };

  return (
    <div className="PrepareMenus">
      <div className="PrepareQuizSpeakBtn">
        <SpeakWordBtn questionWord={QuizName} />
      </div>
      <div
        className="PrepareQuizPlayBtn"
        onClick={() => {
          // クリックされた単語からクイズをスタートするためにcurrentQuizIndexを変更している
          setCurrentQuizIndex(QuizIndex);
          navigate("/PlayQuiz");
        }}
      >
        {/* 大きさ整えるためにサイズ指定している */}
        <IoFootstepsOutline size={iconSize} />
      </div>
      <div>
        <MdIosShare size={iconSize} onClick={handleShare} />
      </div>
    </div>
  );
}

export default PrepareQuizMenu;
