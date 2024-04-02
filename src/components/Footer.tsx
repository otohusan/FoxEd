import "./style/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
      <div className="FooterContent">
        <p
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
        >
          TOPに戻る
        </p>
        <Link to={"/"} className="FooterLink">
          <div>異なる単語データを選択</div>
        </Link>
        <Link to={"/PlayQuiz"} className="FooterLink">
          <div>クイズに挑戦</div>
        </Link>
      </div>
      <div className="FooterCopyright">Copyright ©︎ Konwalk</div>
    </div>
  );
}

export default Footer;
