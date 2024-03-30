import "./style/Introduction.css";

function Introduction() {
  return (
    <div className="introductionContainer">
      <h1>
        <span className="introductionBig">Konwalk(コンウォーク)</span>
        を<br />
        知ってくれて
        <br />
        <span className="introductionBold">ありがとう!</span>
      </h1>
      <h2>
        <span className="introductionBold">下の単語データ</span>から
        <br />
        覚えたい単語を選んでね
      </h2>
      {/* <h2>{`Konwalk(コンウォーク)は\n歩く時間を、勉強ができる時間に\n変える単語帳だよ`}</h2> */}
    </div>
  );
}

export default Introduction;
