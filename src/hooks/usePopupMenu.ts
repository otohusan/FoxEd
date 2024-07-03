import { useState, useCallback } from "react";

const useMenu = () => {
  const [isSelectModeOpen, setIsSelectModeOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<DOMRect | null>(null);

  const handleOpenMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuAnchor(e.currentTarget.getBoundingClientRect());
    setIsSelectModeOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsSelectModeOpen(false);
  }, []);

  return {
    isSelectModeOpen,
    menuAnchor,
    handleOpenMenu,
    handleCloseMenu,
  };
};

export default useMenu;
