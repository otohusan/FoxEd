import React from "react";
import { IoFootstepsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import { BsPerson } from "react-icons/bs";
import "./style/BottomNavigation.css";
import { useNavigate } from "react-router-dom";

//urlの中のページ部分を返す関数
const getPageSegment = () => {
  try {
    if (typeof window === "undefined") {
      return "/";
    }
    const url = window.location.href;
    const urlObj = new URL(url);
    const segments = urlObj.pathname
      .split("/")
      .filter((segment) => segment.length > 0);
    return segments.length > 0 ? `/${segments[0]}` : "/";
  } catch (e) {
    console.error("Invalid URL");
    return "/";
  }
};

//PWAで利用されているかを判定する
const isInStandaloneMode = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    window.matchMedia("(display-mode: minimal-ui)").matches
  );
};

const BottomNavigation = () => {
  // 動的にURLを取得して page セグメントを取得する
  const pageSegment = getPageSegment();

  // PWAの場合とそうでないかで高さを変える
  const isPWAOrNot = isInStandaloneMode();
  const BottomNavigationHeight = isPWAOrNot ? "60px" : "50px";
  const BottomNavigationItemsMarginBottom = isPWAOrNot ? "10px" : "10px";

  const navigate = useNavigate();
  const navItems = [
    {
      text: "ホーム",
      icon: <GoHome />,
      id: "/",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "ウォーク",
      icon: <IoFootstepsOutline />,
      id: "/PlayQuiz",
      onClick: () => {
        navigate("/PlayQuiz");
      },
    },
    {
      text: "学ぶ",
      icon: <LiaBookSolid />,
      id: "/PrepareQuiz",
      onClick: () => {
        navigate("/PrepareQuiz");
      },
    },
    {
      text: "プロフィール",
      icon: <BsPerson />,
      id: "/Profile",
      onClick: () => {
        navigate("/Profile");
      },
    },
  ];

  const selectedIconColor = "#f67a27";
  const selectedTextColor = "#ff802b";

  // クリックされると渡されている関数を実行
  const handleClick = (onClick: () => void) => {
    onClick();
  };

  return (
    <nav
      className="bottom-navigation"
      style={{ height: `${BottomNavigationHeight}` }}
    >
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${pageSegment === item.id ? "is-selected" : ""}`}
          style={{ marginBottom: `${BottomNavigationItemsMarginBottom}` }}
          onClick={() => handleClick(item.onClick)}
        >
          <div className="nav-link">
            {item.icon &&
              React.cloneElement(item.icon, {
                className: "nav-icon",
                color: pageSegment === item.id ? selectedIconColor : "#838383",
              })}
            <span
              className="nav-text"
              style={{
                color: pageSegment === item.id ? selectedTextColor : "#6e6e6e",
              }}
            >
              {item.text}
            </span>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default BottomNavigation;
