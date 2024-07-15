import { useEffect } from "react";

const AboveNavBar = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://adm.shinobi.jp/s/1ace0d006f24678201e5da932f2ddf2f";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="ninja_admax_container">
      {/* 必要に応じて広告をスタイル付けする */}
    </div>
  );
};

export default AboveNavBar;
