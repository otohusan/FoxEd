import "../style/feedback.css";

interface FeedbackProps {
  myDivRef: React.RefObject<HTMLDivElement>;
  feedbackValue: string;
}

function Feedback(props: FeedbackProps) {
  return (
    <div ref={props.myDivRef} className="feedback-container">
      <div className="feedback-value">{props.feedbackValue}</div>
    </div>
  );
}

export default Feedback;
