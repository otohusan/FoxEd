import "./style/HorizontalScroll.css";

type HorizontalScrollProps = {
  children: React.ReactNode;
};

const HorizontalScroll = ({ children }: HorizontalScrollProps) => {
  return (
    <div className="horizontal-scroll-container">
      <div className="horizontal-scroll">{children}</div>
    </div>
  );
};

export default HorizontalScroll;
