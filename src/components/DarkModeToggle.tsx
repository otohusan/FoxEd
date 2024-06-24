import { useColorModeContext } from "./colorMode/useColorModeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleColorMode } = useColorModeContext();

  return (
    <div className="dark-mode-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleColorMode}
        />
        <span className="slider round"></span>
      </label>
      <span>{isDarkMode ? "ダークモード" : "ライトモード"}</span>
    </div>
  );
};

export default DarkModeToggle;
