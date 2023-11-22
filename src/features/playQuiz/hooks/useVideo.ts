// useCamera.ts
import { useState, useRef, useCallback } from "react";

const useVideo = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const startVideo = useCallback(async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //ビデオに割り当てる値を保持する
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
            aspectRatio: { ideal: 16 / 9 },
            frameRate: { ideal: 60 },
          },
        });

        setVideoStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsVideoPlaying(true);
        }
      }
    } catch (error) {
      console.error("カメラへのアクセスに失敗しました。", error);
    }
  }, []); // useCallbackを使用して関数をメモ化

  const stopVideo = useCallback(() => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setIsVideoPlaying(false);
    }
  }, [videoStream]); // videoStreamの変更を監視

  return {
    videoRef,
    isVideoPlaying,
    startVideo,
    stopVideo,
  };
};

export default useVideo;
