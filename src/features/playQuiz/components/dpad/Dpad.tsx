import "../../style/dpad/dpad.css";

const Dpad = (props: { moveRunningManRight: () => void }) => {
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
          onClick={() => onDirection("left")}
        >
          ←
        </button>
        <div className="dpad-middle"></div>
        <button
          className="dpad-button right"
          onClick={() => onDirection("right")}
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
