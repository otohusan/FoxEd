import { useState, useCallback } from "react";

const usePopupMenu = () => {
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
  const [popupMenuAnchor, setPopupMenuAnchor] = useState<DOMRect | null>(null);

  const handleOpenPopupMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPopupMenuAnchor(e.currentTarget.getBoundingClientRect());
    setIsPopupMenuOpen(true);
  }, []);

  const handleClosePopupMenu = useCallback(() => {
    setIsPopupMenuOpen(false);
  }, []);

  return {
    isPopupMenuOpen,
    popupMenuAnchor,
    handleOpenPopupMenu,
    handleClosePopupMenu,
  };
};

export default usePopupMenu;
