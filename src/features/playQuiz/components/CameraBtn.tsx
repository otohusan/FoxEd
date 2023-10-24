import { HiMiniVideoCamera } from "react-icons/hi2";
import { HiMiniVideoCameraSlash } from "react-icons/hi2";

export const StartCameraBtn = () => {
  return (
    <div>
      <span className="material-icons">
        <HiMiniVideoCameraSlash size={30} color={"white"} />
      </span>
    </div>
  );
};

export const StopCameraBtn = () => {
  return (
    <div>
      <span className="material-icons">
        <HiMiniVideoCamera size={30} color={"white"} />
      </span>
    </div>
  );
};
