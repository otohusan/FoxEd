import SpeakQuizWord from "./SpeakQuizWordBtn";
import "../style/quizWord.css";

function QuizWord(props: { questionWord: string }) {
  return (
    <div>
      <div className="quizWord">{props.questionWord}</div>
      <SpeakQuizWord questionWord={props.questionWord} />
    </div>
  );
}

export default QuizWord;
