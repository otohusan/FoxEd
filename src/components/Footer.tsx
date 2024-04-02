import "./style/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="Footer">
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
          異なる単語データを選択
        </Link>
        <Link to={"/PlayQuiz"} className="FooterLink">
          クイズに挑戦
        </Link>
      </div>
      <p className="FooterCopyright">Copyright ©︎ Konwalk</p>
    </footer>
  );
}

export default Footer;
