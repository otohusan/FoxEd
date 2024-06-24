import { MdOutlineWbSunny } from "react-icons/md";
import { useColorModeContext } from "./colorMode/useColorModeContext";
import { PiMoonFill } from "react-icons/pi";
import "./style/DarkModeToggle.css";

const DarkModeToggle = () => {
  const { isDarkMode, toggleColorMode } = useColorModeContext();
  const iconSize = "1.8em";

  return (
    <div>
      <button onClick={toggleColorMode} className="dark-mode-toggle">
        {isDarkMode ? (
          <MdOutlineWbSunny
            size={iconSize}
            style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1))" }}
          />
        ) : (
          <PiMoonFill
            size={iconSize}
            style={{ filter: "drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1))" }}
          />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
