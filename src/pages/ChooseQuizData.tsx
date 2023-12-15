import { useNavigate } from "react-router-dom";

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

function labelOnClick(
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>,
  quizData: Quiz[]
) {
  alert("kuu");
  setQuizzes(quizData);
}

function ChooseQuizData({ quizzes, setQuizzes }: ChooseQuizDataProps) {
  const navigate = useNavigate();

  return (
    <div style={{ color: "black" }}>
      {quizzes.map((quizFormat, index) => (
        <div key={index}>
          <h2
            onClick={() => {
              labelOnClick(setQuizzes, quizFormat.body);
            }}
          >
            {quizFormat.label}
          </h2>
        </div>
      ))}
      <div onClick={() => navigate("/PrepareQuiz")}>単語を覚える 💡</div>
    </div>
  );
}

export default ChooseQuizData;
