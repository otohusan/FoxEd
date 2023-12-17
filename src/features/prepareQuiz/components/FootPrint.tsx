import { PiPawPrint } from "react-icons/pi";
import "../style/FootPrint.css";

const IconStyle = {
  size: 40,
  color: "rgba(149, 75, 0, 0.7)",
};

function FootPrint() {
  return (
    <div>
      <div className="FootPrint1">
        <PiPawPrint {...IconStyle} />
      </div>
      <div className="FootPrint2">
        <PiPawPrint {...IconStyle} />
      </div>
      <div className="FootPrint3">
        <PiPawPrint {...IconStyle} />
      </div>
      <div className="FootPrint4">
        <PiPawPrint {...IconStyle} />
      </div>
      <div className="FootPrint5">
        <PiPawPrint {...IconStyle} />
      </div>
      <div className="FootPrint6">
        <PiPawPrint {...IconStyle} />
      </div>
      <div className="FootPrint7">
        <PiPawPrint {...IconStyle} />
      </div>
    </div>
  );
}

export default FootPrint;
