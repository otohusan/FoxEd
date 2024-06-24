// ColorModeContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";

type ColorModeContextType = {
  isDarkMode: boolean;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleColorMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ColorModeContext.Provider value={{ isDarkMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
