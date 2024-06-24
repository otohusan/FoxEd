import { useEffect, useState } from "react";
import "./style/Header.css";
import { MenuBar } from ".";
import DarkModeToggle from "./DarkModeToggle";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const threshold = 50;

  // スクロールイベントハンドラー
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
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
    <header
      className={`HeaderContainer ${!isVisible ? "hidden" : ""} ${
        isMenuOpen ? "MenuOpen" : ""
      }`}
    >
      <div className={`HeaderTitle ${isMenuOpen ? "MenuOpen" : ""}`}>
        {HeaderTitle}
      </div>

      <div className="header-actions">
        <DarkModeToggle />
        <MenuBar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>
    </header>
  );
}

export default Header;
