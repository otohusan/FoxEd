import "../style/videoStyles.css"; // CSSをインポート
import { useCamera } from "../hooks";
import { StartCameraBtn, StopCameraBtn } from "./CameraBtn";

function Video() {
  const { videoRef, isVideoPlaying, startCamera, stopCamera } = useCamera();

  return (
    <div id="videoContainer">
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>
      <div
        style={{ position: "absolute" }}
        onClick={isVideoPlaying ? stopCamera : startCamera}
      >
        {isVideoPlaying ? <StopCameraBtn /> : <StartCameraBtn />}
      </div>
    </div>
  );
}

export default Video;
