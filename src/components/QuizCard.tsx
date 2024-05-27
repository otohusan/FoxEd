import "./style/quizCard.css";
import { useEffect, useRef, useState } from "react";

type Options = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

const useElementOnScreen = (
  options: Options
): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

type quizCardProps = { frontElement: string; backElement: string };

const QuizCard = (props: quizCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.85,
  });

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`quiz-card ${isFlipped ? "is-flipped" : ""} ${
        isVisible ? "is-visible" : ""
      }`}
      onClick={handleClick}
    >
      <div className="quiz-card-inner" ref={containerRef}>
        <div className={`quiz-card-front ${isVisible ? "is-visible" : ""}`}>
          {props.frontElement}
        </div>
        <div className={`quiz-card-back ${isVisible ? "is-visible" : ""}`}>
          {props.backElement}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
