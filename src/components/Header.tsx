import { useEffect, useState } from "react";
import "./style/Header.css";
import { MenuBar } from ".";

// windowに依存してるやつ
// function Header({ HeaderTitle }: { HeaderTitle: string }): JSX.Element {
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(window.scrollY);
//   const threshold = 50;

//   useEffect(() => {
//     const handleScroll = () => {
//       let currentScrollY = window.scrollY;
//       const pageHeight = document.body.scrollHeight;
//       const viewportHeight = window.innerHeight;
//       const bottomPosition = pageHeight - viewportHeight;

//       if (Math.abs(currentScrollY - lastScrollY) > threshold) {
//         // ページの最下部近くでのスクロールでは状態を変更しない
//         if (currentScrollY >= bottomPosition - threshold) {
//           return;
//         }

//         if (currentScrollY < lastScrollY || currentScrollY < 10) {
//           setIsVisible(true);
//         } else {
//           setIsVisible(false);
//         }

//         setLastScrollY(currentScrollY);
//       }
//     };

//     // window.addEventListener("scroll", handleScroll);
//     // return () => window.removeEventListener("scroll", handleScroll);
//     useScroll(handleScroll);
//   }, [lastScrollY]);

//   return (
//     <div className={`HeaderContainer ${!isVisible ? "hidden" : ""}`}>
//       <div className="HeaderTitle">{HeaderTitle} </div>
//       <MenuBar />
//     </div>
//   );
// }

// export default Header;

type HeaderProps = {
  HeaderTitle: string;
};

type ScrollEventHandler = (event: Event) => void;
// カスタムフック: スクロールイベントを扱う
function useScroll(onScroll: ScrollEventHandler) {
  useEffect(() => {
    // SSR環境での実行を回避するためのチェック
    if (typeof window === "undefined") {
      return;
    }

    // スクロールイベントのハンドラーを登録
    window.addEventListener("scroll", onScroll);

    // コンポーネントのアンマウント時にイベントハンドラーを削除
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);
}

function Header({ HeaderTitle }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const threshold = 50;

  // スクロールイベントハンドラー
  const handleScroll = () => {
    let currentScrollY = window.scrollY;
    const pageHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;
    const bottomPosition = pageHeight - viewportHeight;

    if (Math.abs(currentScrollY - lastScrollY) > threshold) {
      if (currentScrollY >= bottomPosition - threshold) {
        return;
      }

      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    }
  };

  // カスタムフックを利用してスクロールイベントを設定
  useScroll(handleScroll);

  return (
    <div className={`HeaderContainer ${!isVisible ? "hidden" : ""}`}>
      <div className="HeaderTitle">{HeaderTitle}</div>
      <MenuBar />
    </div>
  );
}

export default Header;
