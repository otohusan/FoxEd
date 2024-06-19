import "../style/PrepareMenus.css";
import SpeakWordBtn from "./SpeakWordBtn";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdIosShare } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import shareContent from "../../../api/shareContent";
import { RxDotsHorizontal } from "react-icons/rx";

type PrepareQuizMenuProps = {
  isOwner: boolean;
  QuizID: string | undefined;
  QuizAnswer: string;
  QuizName: string;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
  QuizIndex: number;
  handleClickMenu: (
    e: React.MouseEvent,
    quiz: { id: string; question: string; answer: string }
  ) => void;
};

function PrepareQuizMenu({
  isOwner,
  QuizID,
  QuizAnswer,
  QuizName,
  setCurrentQuizIndex,
  QuizIndex,
  handleClickMenu,
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
      {QuizID && isOwner && (
        <button
          className="owner-drop-quiz-menu"
          onClick={(e) => {
            handleClickMenu(e, {
              id: QuizID,
              question: QuizName, // 適切な値に変更
              answer: QuizAnswer, // 適切な値に変更
            });
          }}
        >
          <RxDotsHorizontal size={iconSize} />
        </button>
      )}
      {(!isOwner || !QuizID) && (
        <button onClick={handleShare} className="quiz-share-btn">
          <MdIosShare size={iconSize} />
        </button>
      )}
    </div>
  );
}

export default PrepareQuizMenu;
