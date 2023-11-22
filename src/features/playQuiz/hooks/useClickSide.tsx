import { useCallback } from "react";

type UseClickSideProps = {
  onLeftEdgeClick: () => void;
  onRightEdgeClick: () => void;
};

function useClickSide({
  onLeftEdgeClick,
  onRightEdgeClick,
}: UseClickSideProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const clickY = e.clientY;
      const screenHeightClickable = window.innerHeight / 2;
      const clickableHeight = 30;

      if (
        clickY > screenHeightClickable + clickableHeight ||
        clickY < screenHeightClickable - clickableHeight
      ) {
        return;
      }

      const clickX = e.clientX;
      const screenWidth = window.innerWidth;

      const centerLeftEdge = 0;
      const centerRightEdge = screenWidth;
      const unClickableCenterArea = 30;

      // クリックされた位置が左端か右端に近いかどうかを判断します。
      if (
        Math.abs(clickX - centerLeftEdge) <
        screenWidth / 2 - unClickableCenterArea
      ) {
        onLeftEdgeClick();
      } else if (
        Math.abs(clickX - centerRightEdge) <
        screenWidth / 2 - unClickableCenterArea
      ) {
        onRightEdgeClick();
      }
    },
    [onLeftEdgeClick, onRightEdgeClick]
  );

  return {
    handleClick,
  };
}

export default useClickSide;
