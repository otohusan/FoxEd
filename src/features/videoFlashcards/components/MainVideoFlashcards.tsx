import {
  StopVideoBtn,
  StartVideoBtn,
} from "../../playQuiz/components/VideoBtn";
import { useVideo } from "../../playQuiz/hooks";
import "../style/MainVideoFlashcards.css";

function MainVideoFlashcards() {
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();
  return (
    <div id="video-flashcards-container">
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>
      <div
        className="video-flashcards-btn"
        onClick={isVideoPlaying ? stopVideo : startVideo}
      >
        {isVideoPlaying ? <StopVideoBtn /> : <StartVideoBtn />}
      </div>
    </div>
  );
}

export default MainVideoFlashcards;
