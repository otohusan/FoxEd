import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import "./style/BottomNavigation.css";

const BottomNavigation = () => {
  const navItems = [
    {
      text: "ホーム",
      icon: <GoHome />,
      id: "home",
      onClick: () => {},
    },
    {
      text: "プロフィール",
      icon: <CgProfile />,
      id: "profile",
      onClick: () => {},
    },
    {
      text: "探す",
      icon: <AiOutlineSearch />,
      id: "search",
      onClick: () => {},
    },
  ];

  const [selected, setSelected] = useState("home");
  const selectedIconColor = "#f67a27";
  const selectedTextColor = "#ff802b";

  const handleClick = (id: string, onClick: () => void) => {
    setSelected(id);
    onClick();
  };

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-item ${selected === item.id ? "is-selected" : ""}`}
          onClick={() => handleClick(item.id, item.onClick)}
        >
          <div className="nav-link">
            {item.icon &&
              React.cloneElement(item.icon, {
                className: "nav-icon",
                color: selected === item.id ? selectedIconColor : "#838383",
              })}
            <span
              className="nav-text"
              style={{
                color: selected === item.id ? selectedTextColor : "#6e6e6e",
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
