import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./style/PopupMenu.css";
import { useClickAway } from "../hooks";

type MenuItem = {
  text: string;
  link?: string;
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
};

type PopupMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  anchor: DOMRect | null;
};

const PopupMenu: React.FC<PopupMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  anchor,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // 閉じるカスタムフック
  useClickAway(menuRef, onClose);

  if (!isOpen || !anchor) return null;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  let x = anchor.left + 50;
  let y = anchor.top + anchor.height + window.scrollY - 100;

  if (x + 200 > screenWidth) {
    x = anchor.left - 200 + anchor.width;
  }
  if (y - window.scrollY + 200 > screenHeight) {
    y = anchor.top - 100 + window.scrollY;
  }

  return (
    <div
      className="PopupMenu"
      style={{ top: `${y}px`, left: `${x}px` }}
      ref={menuRef}
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.link ? (
            <Link to={item.link} className="MenuOption">
              {item.text}
            </Link>
          ) : (
            <div className="MenuOption" onClick={item.onClick}>
              {item.text}
            </div>
          )}
          {index < menuItems.length - 1 && (
            <div className="MenuOption-hr-line"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PopupMenu;
