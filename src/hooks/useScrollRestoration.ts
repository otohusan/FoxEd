import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollPositions {
  [key: string]: number;
}

const scrollPositions: ScrollPositions = {};

function useScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollPosition = scrollPositions[pathname] || 0;

    // このページは操作しない
    if (pathname == "/PrepareQuiz") {
      return;
    }
    // 遅延させてスクロール位置を設定
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
      });
    }, 0); // 300msの遅延（必要に応じて調整）

    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
}

export default useScrollRestoration;
