import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <div>
      <div onClick={() => navigate("/ChooseQuizData")}>単語データを選択</div>
      <div onClick={() => navigate("/PlayQuiz")}>クイズに挑戦</div>
    </div>
  );
}

export default Footer;
