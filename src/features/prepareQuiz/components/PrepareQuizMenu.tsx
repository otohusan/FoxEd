import "../style/PrepareMenus.css";
import SpeakWordBtn from "./SpeakWordBtn";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdIosShare } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import shareContent from "../../../api/shareContent";

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
  const iconSize: string = "22px";

  const navigate = useNavigate();

  // share機能
  const handleShare = () => {
    shareContent({
      title: "Konwalk",
      text: "歩く時間を無駄にしない単語帳",
      url: "https://konwalk.jp",
    });
  };

  return (
    <div className="PrepareMenus">
      <div className="PrepareQuizSpeakBtn">
        <SpeakWordBtn questionWord={QuizName} />
      </div>
      <Link
        to={"/PlayQuiz"}
        className="PrepareQuizPlayBtn"
        onClick={(e) => {
          // クリックされた単語からクイズをスタートするためにcurrentQuizIndexを変更している
          e.preventDefault();
          setCurrentQuizIndex(QuizIndex);
          navigate("/PlayQuiz");
        }}
      >
        {/* 大きさ整えるためにサイズ指定している */}
        <IoFootstepsOutline size={iconSize} />
      </Link>
      <button onClick={handleShare}>
        <MdIosShare size={iconSize} />
      </button>
    </div>
  );
}

export default PrepareQuizMenu;
