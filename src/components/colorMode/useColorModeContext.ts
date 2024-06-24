import { useContext } from "react";
import { ColorModeContext } from "./ColorModeContext";

export const useColorModeContext = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(
      "useColorModeContext must be used within a ColorModeProvider"
    );
  }
  return context;
};
