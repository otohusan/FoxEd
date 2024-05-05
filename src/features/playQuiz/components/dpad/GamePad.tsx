import Dpad from "./Dpad";
import "../../style/dpad/GamepadContainer.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GoNote } from "react-icons/go";
import { IoVideocamOutline } from "react-icons/io5";
import { FaRunning } from "react-icons/fa";

function GamePad() {
  function moveRunningManRight() {
    const runningMan = document.getElementById("runningMan");
    if (!runningMan) return; // 要素がない場合は何もしない

    // getComputedStyleを使って現在のleftの値を取得し、整数値に変換
    const currentLeftPosition = parseInt(
      window.getComputedStyle(runningMan).left,
      10
    );
    const currentTopPosition = parseInt(
      window.getComputedStyle(runningMan).top,
      10
    );
    const newLeftPosition = currentLeftPosition + 30; // 右に10ピクセル移動
    const newTopPosition = currentTopPosition - 100; // 右に10ピクセル移動

    runningMan.style.left = newLeftPosition + "px"; // 新しい位置を設定
    runningMan.style.top = newTopPosition + "px"; // 新しい位置を設定

    setTimeout(() => {
      runningMan.style.top = currentTopPosition + "px";
      runningMan.style.left = newLeftPosition + 10 + "px";
    }, 200);
  }
  return (
    <div className="GamepadContainer">
      <div className="GamePlayView">
        <div className="runningMan" id="runningMan">
          <FaRunning size={40} onClick={moveRunningManRight} />
        </div>
      </div>
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
