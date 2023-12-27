import { useState, useEffect } from "react";
import "../style/MovableSheet.css";

function MovableSheet() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [relPosition, setRelPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      let pageX, pageY;

      if ("touches" in e) {
        // タッチイベント
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;
      } else {
        // マウスイベント
        pageX = (e as MouseEvent).pageX;
        pageY = (e as MouseEvent).pageY;
      }

      setPosition({
        x: pageX - relPosition.x,
        y: pageY - relPosition.y,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault(); // ドラッグ中のスクロールを防止
        const touch = e.touches[0];
        setPosition({
          x: touch.pageX - relPosition.x,
          y: touch.pageY - relPosition.y,
        });
      }
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, relPosition]);

  const startDrag = (pageX: number, pageY: number) => {
    setIsDragging(true);
    setRelPosition({
      x: pageX - position.x,
      y: pageY - position.y,
    });
  };

  const onMouseDown = (e: {
    preventDefault: () => void;
    pageX: number;
    pageY: number;
  }) => {
    e.preventDefault(); // デフォルトのブラウザの動作を無効にする
    startDrag(e.pageX, e.pageY);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    startDrag(touch.pageX, touch.pageY);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="MovableSheet"
    />
  );
}

export default MovableSheet;
