import { useRef } from "react";
import "./style/MenuBar.css";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useClickAway } from "../hooks";
import { useAuth } from "./auth/useAuth";

type MenuBarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuBar({ isOpen, setIsOpen }: MenuBarProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 外側をクリックしたら閉じるカスタムフックを呼び出し
  useClickAway(menuRef, () => {
    setIsOpen(false);
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  // ログアウト用の関数
  const handleLogout = () => {
    logout();
    // ログインページにリダイレクト
    navigate("/Profile");
  };

  return (
    <div>
      <button onClick={toggleMenu} className="MenuBar">
        <RiMenu2Fill
          size={"1.5em"}
          style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))" }}
        />
      </button>
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
            <li>
              <button onClick={handleLogout} className="menu-logout-button">
                ログアウト
              </button>
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
