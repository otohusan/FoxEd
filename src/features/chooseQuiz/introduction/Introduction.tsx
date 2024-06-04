import { useAuth } from "../../../components/auth/useAuth";
import "./style/Introduction.css";

function Introduction() {
  const { user } = useAuth();
  return (
    <div className="introductionContainer">
      <h1 className="introductionComment">
        <p style={{ color: "black" }}>{user?.email}</p>
        <span className="introductionBig">Konwalk(コンウォーク)</span>
        <br />
        を<br />
        知ってくれて
        <br />
        <span className="introductionBold">ありがとう!</span>
      </h1>
      <img
        src="/Konwalk_char.svg"
        alt="Konwalk Character"
        loading="lazy"
        className="konwalk_char"
      />
      <h2 className="introductionNavigateComment">
        下にある <span className="introductionBold">英単語リスト</span> から
        <br />
        覚えたい単語を選んでね
      </h2>
      {/* <h2>{`Konwalk(コンウォーク)は\n歩く時間を、勉強ができる時間に\n変える単語帳だよ`}</h2> */}
    </div>
  );
}

export default Introduction;
