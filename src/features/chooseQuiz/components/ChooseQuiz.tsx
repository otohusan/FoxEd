import { useNavigate, NavigateFunction } from "react-router-dom";
// import { useEffect } from "react";
import { Header, Footer, HeadDataHelmet } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";
// import BacPic from "../../../assets/BacPic.png";
import "../style/WalkGirl.css";
import "../style/ChooseQuizContainer.css";
import { QuizFormat } from "../../../../type/index.ts";
import { quizzes as yumetan } from "../../../assets/quizzes.ts";
import Introduction from "../introduction/Introduction.tsx";

type ChooseQuizProps = {
  quizzes: QuizFormat[];
  setQuizzes: React.Dispatch<React.SetStateAction<QuizFormat>>;
};

// データセットを選択すると、その問題がセットされる
function labelOnClick(
  setQuizzes: React.Dispatch<React.SetStateAction<QuizFormat>>,
  quizData: QuizFormat,
  navigate: NavigateFunction
) {
  setQuizzes(quizData);
  navigate("/PrepareQuiz");
}

function ChooseQuiz({ quizzes, setQuizzes }: ChooseQuizProps) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div>
      <HeadDataHelmet pageTitle="選択ページ" />
      <Header HeaderTitle="Choose" />
      {/* <div className="IntroductionTopTitle">あいさつ</div>
      <div className="hr-line"></div> */}
      <Introduction />
      <div className="ChooseTopTitle">単語データ</div>
      <div className="hr-line"></div>
      {/* <img src={BacPic} className="WalkGirl" /> */}
      <div className="ChooseQuizListTitle">TOIEC英単語</div>
      <div className="ChooseQuizDataList">
        {quizzes.map((quizFormat, index) => (
          <div
            key={index}
            onClick={() => {
              labelOnClick(setQuizzes, quizFormat, navigate);
            }}
            className="ChooseQuizContainerWrapper"
          >
            <ChooseQuizContainer quizFormat={quizFormat} />
          </div>
        ))}
      </div>
      <div className="ChooseQuizListTitleKoukou">高校英単語</div>
      <div className="ChooseQuizDataList">
        {yumetan.map((quizFormat, index) => (
          <div
            key={index}
            onClick={() => {
              labelOnClick(setQuizzes, quizFormat, navigate);
            }}
            className="ChooseQuizContainerWrapper"
          >
            <ChooseQuizContainer quizFormat={quizFormat} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ChooseQuiz;
