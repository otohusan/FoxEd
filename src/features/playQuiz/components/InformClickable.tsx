import { BsFillHandIndexThumbFill } from "react-icons/bs";
import "../style/InformClickable.css";
import { useState, useEffect } from "react";

const InformClickableStyle = {
  size: 40,
  color: "transparent",
  stroke: "rgba(251, 162, 120, 0.804)",
  strokeWidth: "1",
};

export const InformClickableRight = () => {
  return (
    <div className="InformClickableRightContainer">
      <div className="clickableArea"></div>
      <BsFillHandIndexThumbFill {...InformClickableStyle} />
    </div>
  );
};

export const InformClickableLeft = () => {
  return (
    <div className="InformClickableLeftContainer">
      <div className="clickableArea"></div>
      <BsFillHandIndexThumbFill {...InformClickableStyle} />
    </div>
  );
};

export const InformClickable = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3500); // 2秒後に非表示にする
  }, []); // 空の依存配列で、この useEffect はコンポーネントのマウント時に1回だけ実行されます

  return (
    <div
      className={`InformClickable ${isVisible ? "" : "InformClickable-hidden"}`}
    >
      <InformClickableLeft />
      <InformClickableRight />
    </div>
  );
};
