import SpeakQuizWord from "./SpeakQuizWordBtn";
import "../style/quizWord.css";

function QuizWord(props: { questionWord: string }) {
  return (
    <div className="quizWordContainer">
      <div className="quizWord">{props.questionWord}</div>
      <SpeakQuizWord questionWord={props.questionWord} wordBtnSize={40} />
    </div>
  );
}

export default QuizWord;
