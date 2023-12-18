import { useEffect, useState } from "react";
import "./style/Header.css";
import { MenuBar } from ".";

function Header({ HeaderTitle }: { HeaderTitle: string }): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const threshold = 50; // スクロールのしきい値

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        if (currentScrollY < lastScrollY || currentScrollY < 5) {
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
      <div className="HeaderTitle">{HeaderTitle}</div>
      <MenuBar />
    </div>
  );
}

export default Header;
