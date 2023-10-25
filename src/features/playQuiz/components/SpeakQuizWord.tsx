import "../style/speakQuizWord.css";
import { GiSoundWaves } from "react-icons/gi";

function SpeakQuizWord() {
  return (
    <div className="speakQuizWordBtn">
      <GiSoundWaves
        size={50}
        style={{
          filter:
            "drop-shadow(1px 1.5px 0px #f09038) drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5))",
        }}
      />
    </div>
  );
}

export default SpeakQuizWord;
