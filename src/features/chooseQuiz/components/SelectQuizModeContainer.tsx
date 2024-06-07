import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/SelectQuizMode.css";
import { useClickAway } from "../../../hooks";

type SelectQuizModeContainerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SelectQuizModeContainer: React.FC<SelectQuizModeContainerProps> = ({
  isOpen,
  onClose,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  // 閉じるカスタムフック
  useClickAway(menuRef, onClose);

  useEffect(() => {
    function calculatePosition(event: MouseEvent) {
      const SELECT_MODE_WIDTH = 200;
      const SELECT_MODE_HEIGHT = 100;

      let x = event.clientX;
      let y = event.clientY;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (x + SELECT_MODE_WIDTH > screenWidth) {
        x = screenWidth - SELECT_MODE_WIDTH;
      }
      if (y + SELECT_MODE_HEIGHT > screenHeight) {
        y = screenHeight - SELECT_MODE_HEIGHT;
      }

      y += window.scrollY - 50;
      setPosition({ x, y });
    }

    if (isOpen) {
      document.addEventListener("click", calculatePosition);
    }

    return () => {
      document.removeEventListener("click", calculatePosition);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="SelectQuizModeContainer"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      ref={menuRef}
    >
      <Link to={"/PlayQuiz"} className="SelectMode">
        歩いて覚える
      </Link>
      <div className="SelectMode-hr-line"></div>
      <Link to={"/PrepareQuiz"} className="SelectMode">
        単語帳で覚える
      </Link>
    </div>
  );
};

export default SelectQuizModeContainer;
