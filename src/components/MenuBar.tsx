import { useState, useRef } from "react";
import "./style/MenuBar.css";
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  // メニューではない部分がクリックされたらメニューを閉じる
  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);

  return (
    <div>
      <div onClick={toggleMenu} className="MenuBar">
        <RiMenu2Fill
          size={"2em"}
          style={{
            filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))",
          }}
        />
      </div>
      {isOpen && (
        <div className="MenuContainer">
          <div className="MenuContent" ref={menuRef}>
            <div onClick={() => navigate("/")}>クイズに戻る</div>
            <div onClick={toggleMenu}>メニューを閉じる</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
