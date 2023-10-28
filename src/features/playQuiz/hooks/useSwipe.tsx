// useSwipe.js
import { useState, useCallback } from "react";

type useSwipeProps = {
  //こんな引数貰わなあかんかな？もっといい方法ないかな
  //あと、これやったら問題の変更にしか使えやんスワイプフックになってしまってるから、応用できない
  functionActivated: React.Dispatch<React.SetStateAction<number>>;
  quizIndex: number;
  quizSize: number;
};

function useSwipe({ functionActivated, quizIndex, quizSize }: useSwipeProps) {
  const [startX, setStartX] = useState(0);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      setStartX(e.touches[0].clientX);
    },
    []
  );

  const onSwipeLeft = useCallback(() => {
    const nextIndex: number = quizIndex === quizSize - 1 ? 0 : quizIndex + 1;
    functionActivated(nextIndex);
  }, [functionActivated, quizIndex, quizSize]); // 依存配列は空ですが、必要に応じて他の依存関係を追加できます

  const onSwipeRight = useCallback(() => {
    const nextIndex: number = quizIndex - 1 < 0 ? quizSize - 1 : quizIndex - 1;
    functionActivated(nextIndex);
  }, [functionActivated, quizIndex, quizSize]); // functionActivated を依存配列に含めます

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const endX = e.changedTouches[0].clientX;
      const swipeVelocity: number = 70;
      if (startX - endX > swipeVelocity) {
        onSwipeLeft();
      } else if (endX - startX > swipeVelocity) {
        onSwipeRight();
      }
    },
    [startX, onSwipeLeft, onSwipeRight]
  );

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}

export default useSwipe;
