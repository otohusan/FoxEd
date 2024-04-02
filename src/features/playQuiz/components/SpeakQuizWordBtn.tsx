import "../style/speakQuizWord.css";
import { GiSoundWaves } from "react-icons/gi";
import { speakWord } from "../../../api";

function SpeakQuizWord(props: { questionWord: string; wordBtnSize: number }) {
  return (
    <button
      className="speakQuizWordBtn"
      onClick={() => speakWord(props.questionWord)}
    >
      <GiSoundWaves
        size={props.wordBtnSize}
        style={{
          filter:
            "drop-shadow(1px 1.5px 0px #f09038) drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))",
        }}
      />
    </button>
  );
}

export default SpeakQuizWord;
