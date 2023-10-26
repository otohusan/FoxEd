import "../style/feedback.css";

interface FeedbackProps {
  myDivRef: React.RefObject<HTMLDivElement>;
}

function Feedback(props: FeedbackProps) {
  return (
    <div ref={props.myDivRef} className="feedback-container">
      <div className="feedback-value"></div>
    </div>
  );
}

export default Feedback;
