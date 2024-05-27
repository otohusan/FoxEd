import React from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import "./style/BottomNavigation.css";

const BottomNavigation = () => {
  const navItems = [
    { text: "ホーム", link: "#home", icon: <AiOutlineHome /> },
    { text: "プロフィール", link: "#profile", icon: <AiOutlineUser /> },
    { text: "検索", link: "#search", icon: <AiOutlineSearch /> },
  ];

  const color = "#585858c";

  return (
    <nav className="bottom-navigation">
      {navItems.map((item, index) => (
        <div key={index} className="nav-item">
          <a href={item.link} className="nav-link">
            {item.icon &&
              React.cloneElement(item.icon, { className: "nav-icon", color })}
            <span className="nav-text">{item.text}</span>
          </a>
        </div>
      ))}
    </nav>
  );
};

export default BottomNavigation;
