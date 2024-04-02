import "./style/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
      <div className="FooterContent">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          }}
          className="BackToTop"
        >
          TOPに戻る
        </button>
        <Link to={"/"} className="FooterLink">
          <p>異なる単語データを選択</p>
        </Link>
        <Link to={"/PlayQuiz"} className="FooterLink">
          <p>クイズに挑戦</p>
        </Link>
      </div>
      <p className="FooterCopyright">Copyright ©︎ Konwalk</p>
    </div>
  );
}

export default Footer;
