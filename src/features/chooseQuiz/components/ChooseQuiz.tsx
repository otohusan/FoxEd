import { useNavigate, NavigateFunction } from "react-router-dom";
import { Header } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";
// import BacPic from "../../../assets/BacPic.png";
import "../style/WalkGirl.css";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type QuizFormat = {
  label: string;
  body: Quiz[];
};

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
    </div>
  );
}

export default ChooseQuiz;
