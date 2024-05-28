import React from "react";
import { IoFootstepsOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import "./style/BottomNavigation.css";
import { useNavigate } from "react-router-dom";

//urlの中のページ部分を返す関数
const getPageSegment = () => {
  try {
    if (window === undefined) {
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

const BottomNavigation = () => {
  // 動的にURLを取得して page セグメントを取得する
  const pageSegment = getPageSegment();

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
  ];

  const selectedIconColor = "#f67a27";
  const selectedTextColor = "#ff802b";

  const handleClick = (onClick: () => void) => {
    onClick();
  };

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${pageSegment === item.id ? "is-selected" : ""}`}
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
