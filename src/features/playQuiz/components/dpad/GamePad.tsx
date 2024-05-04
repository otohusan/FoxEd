import Dpad from "./Dpad";
import "../../style/dpad/GamepadContainer.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GoNote } from "react-icons/go";
import { IoVideocamOutline } from "react-icons/io5";

function GamePad() {
  return (
    <div className="GamepadContainer">
      <div className="GamePlayView"></div>
      <button className="gamepadPiconBtn">
        <FaRegLightbulb size={20} />
      </button>
      <button className="gamepadHomeBtn">
        <GoHome size={20} />
      </button>

      <button className="gamepadNoteBtn">
        <GoNote size={20} />
      </button>

      <button className="gamepadVideoBtn">
        <IoVideocamOutline size={20} />
      </button>

      <p className="KonwalkLogo">Konwalk</p>

      <Dpad />
    </div>
  );
}

export default GamePad;
