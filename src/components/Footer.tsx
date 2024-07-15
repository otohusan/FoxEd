import AdAboveNavBar from "./ad/AdAboveNavBar";
import "./style/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <AdAboveNavBar id="1ace0d006f24678201e5da932f2ddf2f" />
      <footer className="Footer">
        <div className="FooterContent">
          <div
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
            <p>TOPに戻る</p>
          </div>
          <Link to={"/"} className="FooterLink">
            異なる単語データを選択
          </Link>
          <Link to={"/PlayQuiz"} className="FooterLink">
            クイズに挑戦
          </Link>
          <Link to={"/ApplicationPrivacy"} className="FooterLink">
            プライバシーポリシー
          </Link>
        </div>
        <p className="FooterCopyright">Copyright ©︎ Konwalk</p>
      </footer>
    </div>
  );
}

export default Footer;
