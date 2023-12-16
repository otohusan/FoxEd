import { useNavigate, NavigateFunction } from "react-router-dom";
import { Header } from "../../../components";
import ChooseQuizContainer from "./ChooseQuizContainer";

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
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
};

// データセットを選択すると、その問題がセットされる
function labelOnClick(
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>,
  quizData: Quiz[],
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
      <div style={{ color: "black", marginTop: "20%" }}>
        {quizzes.map((quizFormat, index) => (
          <div
            key={index}
            onClick={() => {
              labelOnClick(setQuizzes, quizFormat.body, navigate);
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
