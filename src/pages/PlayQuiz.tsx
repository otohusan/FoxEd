import { Link } from "react-router-dom";
import { quizzes } from "./quizzes";

function PlayQuiz() {
  const a: any = quizzes[25];
  return (
    <div id="videoContainer">
      <video id="video" autoPlay muted playsInline></video>
      <div id="stopButton" style={{ display: "none" }}>
        <span className="material-icons"> videocam_off </span>
      </div>
      <div id="startButton" style={{ display: "none" }}>
        <span className="material-icons"> videocam </span>
      </div>
      <button id="backButton">PreviousQuiz</button>
      <Link to="/ReviewQuiz">
        <button id="minaoshiButton">見直しできます</button>
      </Link>
      {a.answer}
      <button
        id="speakButton"
        //     style="
        //   position: absolute;
        //   left: 50%;
        //   bottom: 30%;
        //   padding: 2vw;
        //   transform: translate(-50%, -50%);
        //   font-size: 20px;
        // "
      >
        Listen
      </button>
      <div id="tango">
        <div id="question"></div>
        <ul id="choices" className="overlayText"></ul>
      </div>
      <div
        id="feedback"
        //     style="
        //   display: none;
        //   position: absolute;
        //   top: 20%;
        //   left: 50%;
        //   transform: translate(-50%, -50%);
        //   background-color: rgba(0, 0, 0, 0.6);
        //   color: white;
        //   padding: 10px;
        //   border-radius: 3px;
        // "
      ></div>
    </div>
  );
}

export default PlayQuiz;
