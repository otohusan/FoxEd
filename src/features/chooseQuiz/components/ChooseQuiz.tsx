import { useNavigate, NavigateFunction } from "react-router-dom";
import { useEffect } from "react";
import { Header, Footer } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";
// import BacPic from "../../../assets/BacPic.png";
import "../style/WalkGirl.css";
import { QuizFormat } from "../../../../type/index.ts";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header HeaderTitle="Choose" />
      {/* <img src={BacPic} className="WalkGirl" /> */}
      <div className="ChooseQuizListTitle">単語データリスト</div>
      <div style={{ marginTop: "5%" }}>
        {quizzes.map((quizFormat, index) => (
          <div
            key={index}
            onClick={() => {
              labelOnClick(setQuizzes, quizFormat, navigate);
            }}
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
