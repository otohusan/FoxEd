import { IoFootstepsSharp } from "react-icons/io5";
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
      <IoFootstepsSharp {...videoIconStyle} />
    </div>
  );
};

export const StopVideoBtn = () => {
  return (
    <div className="videoBtnContainer">
      <HiMiniVideoCameraSlash {...videoIconStyle} />
    </div>
  );
};
