import "../style/video.css"; // CSSをインポート
import { useVideo } from "../hooks";
import { StartVideoBtn, StopVideoBtn } from "./VideoBtn";
import QuizChoices from "./QuizChoices ";
import QuizWord from "./QuizWord";

function Video() {
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();

  return (
    <div id="videoContainer">
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>

      <div
        className="videoBtn"
        onClick={isVideoPlaying ? stopVideo : startVideo}
      >
        {isVideoPlaying ? <StopVideoBtn /> : <StartVideoBtn />}
      </div>

      <div>
        <QuizChoices />
      </div>

      <QuizWord />
    </div>
  );
}

export default Video;
