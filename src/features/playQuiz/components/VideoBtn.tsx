import { HiMiniVideoCamera } from "react-icons/hi2";
import { HiMiniVideoCameraSlash } from "react-icons/hi2";

const videoIconStyle = {
  size: 40,
  color: "white",
  stroke: "rgba(240.12, 144.4, 156.03, 1)",
  strokeWidth: "0.1",
};

export const StartVideoBtn = () => {
  return (
    <div className="videoBtnContainer">
      <span>
        <HiMiniVideoCameraSlash {...videoIconStyle} />
      </span>
    </div>
  );
};

export const StopVideoBtn = () => {
  return (
    <div className="videoBtnContainer">
      <span>
        <HiMiniVideoCamera {...videoIconStyle} />
      </span>
    </div>
  );
};
