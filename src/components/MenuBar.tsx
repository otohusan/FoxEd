// import { useState, useRef, useEffect } from "react";
// import "./style/MenuBar.css";
// import { RiMenu2Fill } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";

// function MenuBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   // メニューが開いているときはスクロールを無効にし、閉じているときは有効にする
//   useEffect(() => {
//     if (isOpen) {
//       // スクロールを無効にする
//       document.body.style.overflow = "hidden";
//     } else {
//       // スクロールを有効にする
//       document.body.style.overflow = "visible";
//     }

//     // コンポーネントのアンマウント時にスクロールを有効に戻す
//     return () => {
//       document.body.style.overflow = "visible";
//     };
//   }, [isOpen]);

//   // メニューではない部分がクリックされたらメニューを閉じる
//   function handleClickOutside(event: MouseEvent) {
//     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   }
//   document.addEventListener("mousedown", handleClickOutside);

//   return (
//     <div>
//       <div onClick={toggleMenu} className="MenuBar">
//         <RiMenu2Fill
//           //   size={"2em"}
//           size={"1.5em"}
//           style={{
//             filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2))",
//           }}
//         />
//       </div>
//       {isOpen && (
//         <div className="MenuContainer">
//           <div className="MenuContent" ref={menuRef}>
//             <div onClick={() => navigate("/ChooseQuizData")}>
//               単語データを選択 🔍
//             </div>
//             <div onClick={() => navigate("/")}>クイズをプレイ ⭕️❌</div>
//             <div onClick={() => navigate("/PrepareQuiz")}>単語を覚える 💡</div>
//             <div onClick={() => navigate("/ReviewQuiz")}>単語を復習 📝</div>
//             <div onClick={toggleMenu}>メニューを閉じる</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MenuBar;

import { useRef, useEffect } from "react";
import "./style/MenuBar.css";
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

type MenuBarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuBar({ isOpen, setIsOpen }: MenuBarProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // SSR環境での実行を回避する
    if (typeof document === "undefined") {
      return;
    }

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
          <div className="MenuContent" ref={menuRef}>
            <div onClick={() => navigate("/")}>単語データを選択 🔍</div>
            <div onClick={() => navigate("/PlayQuiz")}>
              クイズをプレイ ⭕️❌
            </div>
            <div onClick={() => navigate("/PrepareQuiz")}>単語を覚える 💡</div>
            <div onClick={() => navigate("/ReviewQuiz")}>単語を復習 📝</div>
            <div onClick={toggleMenu}>メニューを閉じる</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
