import { useNavigate } from "react-router-dom";
import "./style/Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <div className="Footer">
      <div className="FooterContent">
        <p
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          TOPに戻る
        </p>
        <div onClick={() => navigate("/ChooseQuizData")}>
          異なる単語データを選択
        </div>
        <div onClick={() => navigate("/")}>クイズに挑戦</div>
      </div>
      <div className="FooterCopyright">Copyright ©︎ FoxEd</div>
    </div>
  );
}

export default Footer;
