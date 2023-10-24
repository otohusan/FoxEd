import { HiMiniVideoCamera } from "react-icons/hi2";
import { HiMiniVideoCameraSlash } from "react-icons/hi2";

export const StartCamera = () => {
  return (
    <div>
      <span className="material-icons">
        <HiMiniVideoCameraSlash size={30} color={"white"} />
      </span>
    </div>
  );
};

export const StopCamera = () => {
  return (
    <div>
      <span className="material-icons">
        <HiMiniVideoCamera size={30} color={"white"} />
      </span>
    </div>
  );
};
