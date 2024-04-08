import { useRef, useEffect } from "react";
import "./style/MenuBar.css";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

type MenuBarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuBar({ isOpen, setIsOpen }: MenuBarProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // SSR環境での実行を回避する
    if (typeof document === "undefined") {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div>
      <div onClick={toggleMenu} className="MenuBar">
        <RiMenu2Fill
          size={"1.5em"}
          style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))" }}
        />
      </div>
      {isOpen && (
        <div className="MenuContainer">
          <ul className="MenuContent" ref={menuRef}>
            <li className="MenuLink">
              <Link to={"/"} className="MenuLink">
                単語データを選択 🔍
              </Link>
            </li>
            <li className="MenuLink">
              <Link to={"/PlayQuiz"} className="MenuLink">
                クイズをプレイ ⭕️❌
              </Link>
            </li>
            <li className="MenuLink">
              <Link to={"/PrepareQuiz"} className="MenuLink">
                単語を覚える 💡
              </Link>
            </li>
            <li className="MenuLink">
              <Link to={"/ReviewQuiz"} className="MenuLink">
                単語を復習 📝
              </Link>
            </li>
            <button onClick={toggleMenu} className="menuCloseBtn">
              メニューを閉じる
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
