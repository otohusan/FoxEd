import { IoFootstepsSharp } from "react-icons/io5";
import { HiMiniVideoCameraSlash } from "react-icons/hi2";

const videoIconStyle = {
  size: 40,
  stroke: "rgba(240.12, 144.4, 156.03, 1)",
  strokeWidth: "0.1",
};

export const StartVideoBtn = () => {
  return (
    <button className="videoBtnContainer">
      <IoFootstepsSharp {...videoIconStyle} />
    </button>
  );
};

export const StopVideoBtn = () => {
  return (
    <button className="videoBtnContainer">
      <HiMiniVideoCameraSlash {...videoIconStyle} />
    </button>
  );
};
