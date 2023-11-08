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
      FeedbackRef.current.innerHTML =
        answer === clickedChoice
          ? `<span style="font-size: 24px;">True ⭕️</span><br> <br> A. ${answer}`
          : `<span style="font-size: 24px;  ">False ❌</span> <br> <br>A. ${answer}`;
    }
  }, []);

  return { FeedbackRef, feedbackFunc };
}

export default useFeedback;
