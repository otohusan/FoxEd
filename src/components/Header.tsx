import { useEffect, useState } from "react";
import "./style/Header.css";
import { MenuBar } from ".";

function Header({ HeaderTitle }: { HeaderTitle: string }): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const threshold = 50;

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollY = window.scrollY;
      const pageHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const bottomPosition = pageHeight - viewportHeight;

      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        // ページの最下部近くでのスクロールでは状態を変更しない
        if (currentScrollY >= bottomPosition - threshold) {
          return;
        }

        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`HeaderContainer ${!isVisible ? "hidden" : ""}`}>
      <div className="HeaderTitle">{HeaderTitle} </div>
      <MenuBar />
    </div>
  );
}

export default Header;
