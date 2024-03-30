import "./style/Introduction.css";

function Introduction() {
  return (
    <div className="introductionContainer">
      <h1 className="introductionComment">
        <span className="introductionBig">Konwalk(コンウォーク)</span>
        を<br />
        知ってくれて
        <br />
        <span className="introductionBold">ありがとう!</span>
      </h1>
      <img
        src="/Konwalk_char.svg"
        alt="Konwalk Character"
        className="konwalk_char"
      />
      <h2 className="introductionNavigateComment">
        下にある <span className="introductionBold">単語データ</span> から
        <br />
        覚えたい単語を選んでね
      </h2>
      {/* <h2>{`Konwalk(コンウォーク)は\n歩く時間を、勉強ができる時間に\n変える単語帳だよ`}</h2> */}
    </div>
  );
}

export default Introduction;
