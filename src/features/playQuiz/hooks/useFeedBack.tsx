import { useRef, useCallback } from "react";

interface UseFeedbackReturnType {
  FeedbackRef: React.MutableRefObject<HTMLDivElement | null>;
  feedbackFunc: (answer: string, clickedChoice: string) => void;
}

function useFeedback(): UseFeedbackReturnType {
  const FeedbackRef = useRef<HTMLDivElement | null>(null);

  const feedbackFunc = useCallback((answer: string, clickedChoice: string) => {
    //正解不正解によって、フィードバックコンポーネントの値を変える
    if (FeedbackRef.current) {
      FeedbackRef.current.innerText =
        answer === clickedChoice ? "Right ⭕️" : "Wrong ❌";

      //フィードバックコンポーネントを一時的に表示する
      FeedbackRef.current.style.display = "block";
    }

    //フィードバックコンポーネントを数秒後消す処理
    setTimeout(() => {
      if (FeedbackRef.current) {
        FeedbackRef.current.style.display = "none";
      }
    }, 800);
  }, []);

  return { FeedbackRef, feedbackFunc };
}

export default useFeedback;
