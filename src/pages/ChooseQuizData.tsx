import { useNavigate, NavigateFunction } from "react-router-dom";
import { Header } from "../components";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

type QuizFormat = {
  label: string;
  body: Quiz[];
};

type ChooseQuizDataProps = {
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

function ChooseQuizData({ quizzes, setQuizzes }: ChooseQuizDataProps) {
  const navigate = useNavigate();

  return (
    <div>
      <Header HeaderTitle="Choose" />
      <div style={{ color: "black", margin: "20%" }}>
        {quizzes.map((quizFormat, index) => (
          <div key={index}>
            <h2
              onClick={() => {
                labelOnClick(setQuizzes, quizFormat.body, navigate);
              }}
            >
              {quizFormat.label}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseQuizData;
