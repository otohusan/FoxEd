import "../../style/dpad/dpad.css";

const Dpad = (props: {
  moveRunningManRight: () => void;
  moveRunningMan: (pix: number) => void;
}) => {
  function onDirection(s: string) {
    // alert(`${s}がクリックされた`);
    return s;
  }
  return (
    <div className="dpad">
      <button className="dpad-button up" onClick={props.moveRunningManRight}>
        ↑
      </button>
      <div className="dpad-center">
        <button
          className="dpad-button left"
          onClick={() => props.moveRunningMan(-30)}
        >
          ←
        </button>
        <div className="dpad-middle"></div>
        <button
          className="dpad-button right"
          onClick={() => props.moveRunningMan(30)}
        >
          →
        </button>
      </div>
      <button className="dpad-button down" onClick={() => onDirection("down")}>
        ↓
      </button>
    </div>
  );
};

export default Dpad;
