import { useRef, useEffect, useState } from "react";
import "../style/videoStyles.css"; // CSSをインポート
import { useCamera } from "../hooks";
import { StartCamera, StopCamera } from "./cameraOnOffBtn";

function Video() {
  const { videoRef, isVideoPlaying, startCamera, stopCamera } = useCamera();

  return (
    <div id="videoContainer">
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>
      {/* <div
        id="stopButton"
        style={{ display: isVideoPlaying ? "block" : "none" }}
        onClick={stopCamera}
      >
        <span className="material-icons">
          <HiMiniVideoCameraSlash size={30} color={"white"} />
        </span>
      </div>
      <div
        id="startButton"
        style={{ display: isVideoPlaying ? "none" : "block" }}
        onClick={startCamera}
      >
        <span className="material-icons">
          <HiMiniVideoCamera />
        </span>
      </div> */}

      <div
        style={{ position: "absolute" }}
        className="stopButton"
        onClick={isVideoPlaying ? stopCamera : startCamera}
      >
        {isVideoPlaying ? <StopCamera /> : <StartCamera />}
      </div>
    </div>
  );
}

export default Video;
