import { useState, useEffect } from "react";

function MovableSheet() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [relPosition, setRelPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: { pageX: number; pageY: number }) => {
      if (!isDragging) return;
      setPosition({
        x: e.pageX - relPosition.x,
        y: e.pageY - relPosition.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, relPosition]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // デフォルトのブラウザの動作を無効にする
    setIsDragging(true);
    setRelPosition({
      x: e.pageX - position.x,
      y: e.pageY - position.y,
    });
  };

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    />
  );
}

export default MovableSheet;
