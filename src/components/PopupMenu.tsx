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
  position: { x: number; y: number };
};

const PopupMenu: React.FC<PopupMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  position,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // 閉じるカスタムフック
  useClickAway(menuRef, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="PopupMenu"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
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
