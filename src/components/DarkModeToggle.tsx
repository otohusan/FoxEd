import { useDarkMode } from "../hooks";

const DarkModeToggle = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <div className="dark-mode-toggle">
      <label className="switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>
      <span>{isDarkMode ? "ダークモード" : "ライトモード"}</span>
    </div>
  );
};

export default DarkModeToggle;
