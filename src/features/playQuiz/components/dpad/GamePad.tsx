import Dpad from "./Dpad";
import "../../style/dpad/GamepadContainer.css";
import { FaRegLightbulb } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { GoNote } from "react-icons/go";
import { IoVideocamOutline } from "react-icons/io5";
import { RiRunLine } from "react-icons/ri";
import { GrRun } from "react-icons/gr";
import { BiRun } from "react-icons/bi";
import { useEffect, useState } from "react";

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
    const newTopPosition = currentTopPosition - 140; // 右に10ピクセル移動

    runningMan.style.left = newLeftPosition + "px"; // 新しい位置を設定
    runningMan.style.top = newTopPosition + "px"; // 新しい位置を設定

    setTimeout(() => {
      runningMan.style.left = newLeftPosition + 10 + "px";
      runningMan.style.top = currentTopPosition + "px";
    }, 200);
  }

  function animateMovingCloud() {
    const cloud = document.getElementById("gameViewCloud");
    const gameView = document.getElementById("gamePlayView");
    const GamepadContainer = document.getElementById("GamepadContainer");
    if (!cloud || !gameView || !GamepadContainer) return;

    const gameViewWidth = gameView.offsetWidth;
    const CLOUD_WIDTH = 60;
    let currentPos = gameViewWidth - CLOUD_WIDTH;

    const speed = 3; // 雲の移動速度（ピクセル単位）

    const move = () => {
      currentPos -= speed; // 速度を調整
      cloud.style.left = `${currentPos}px`;

      if (currentPos + CLOUD_WIDTH * 2 <= cloud.offsetWidth) {
        currentPos = gameViewWidth + CLOUD_WIDTH;
      }
      requestAnimationFrame(move);
    };

    move();
  }

  // パラパラ漫画用の変数
  let currentFrame = 0;
  const [animeFlag, setAnimeFlag] = useState(false);

  function animateRunning() {
    const frames = document.querySelectorAll(
      ".runningMan > *"
    ) as NodeListOf<HTMLElement>;

    frames.forEach((frame) => {
      frame.style.display = "none"; // 全てのフレームを非表示に
    });

    frames[currentFrame].style.display = "block";

    currentFrame = (currentFrame + 1) % frames.length; // 次のフレームに移動
  }

  // アニメーションを開始
  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (animeFlag) {
      // animeFlagがtrueの場合のみアニメーションを開始
      intervalId = setInterval(animateRunning, 300);
      animateMovingCloud();
    } else {
      // animeFlagがfalseの場合には既存のインターバルをクリア
      clearInterval(intervalId);
    }
    // コンポーネントのアンマウント時にインターバルをクリアする
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeFlag]);

  const runningManSize = 45;

  return (
    <div className="GamepadContainer" id="GamepadContainer">
      <div className="GamePlayView" id="gamePlayView">
        <div className="gameViewCloud" id="gameViewCloud"></div>
        <div className="runningMan" id="runningMan">
          <RiRunLine size={runningManSize} />
          <GrRun size={runningManSize} style={{ display: "none" }} />
          <BiRun size={runningManSize} style={{ display: "none" }} />
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

      <button
        className="gamepadVideoBtn"
        onClick={() => {
          setAnimeFlag(!animeFlag);
        }}
      >
        <IoVideocamOutline size={20} />
      </button>

      <p className="KonwalkLogo">Konwalk</p>

      <Dpad moveRunningManRight={moveRunningManRight} />
    </div>
  );
}

export default GamePad;
