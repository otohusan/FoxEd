import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style/PopupMenu.css";
import { useClickAway } from "../hooks";

type MenuItem = {
  text: string;
  link?: string;
  onClick?: () => void;
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

  // useEffect(() => {
  //   function calculatePosition(event: MouseEvent) {
  //     const MENU_WIDTH = 200;
  //     const MENU_HEIGHT = 100;

  //     let x = event.clientX;
  //     let y = event.clientY;
  //     const screenWidth = window.innerWidth;
  //     const screenHeight = window.innerHeight;

  //     if (x + MENU_WIDTH > screenWidth) {
  //       x = screenWidth - MENU_WIDTH + window.scrollX;
  //     }
  //     if (y + MENU_HEIGHT > screenHeight) {
  //       y = screenHeight - MENU_HEIGHT - window.screenY;
  //     }

  //     y += window.scrollY - 50;

  //   }

  //   function handleMouseUp(event: MouseEvent) {
  //     calculatePosition(event);
  //   }

  //   if (isOpen) {
  //     document.addEventListener("click", handleMouseUp);
  //   }

  //   return () => {
  //     document.removeEventListener("click", calculatePosition);
  //   };
  // }, [isOpen]);

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
