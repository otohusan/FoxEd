import { HiMiniVideoCamera } from "react-icons/hi2";
import { HiMiniVideoCameraSlash } from "react-icons/hi2";

const videoIconStyle = {
  size: 40,
  color: "white",
};

export const StartVideoBtn = () => {
  return (
    <div>
      <span className="material-icons">
        <HiMiniVideoCameraSlash {...videoIconStyle} />
      </span>
    </div>
  );
};

export const StopVideoBtn = () => {
  return (
    <div>
      <span className="material-icons">
        <HiMiniVideoCamera {...videoIconStyle} />
      </span>
    </div>
  );
};
