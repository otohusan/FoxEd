import React, { useEffect, useRef } from "react";
import "./style/AdAboveNavBar.css";

const AdAboveNavBar: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.style.width = "330px";
    // iframe.style.height = "auto";
    iframe.style.border = "none";

    const currentAdRef = adRef.current;
    if (currentAdRef) {
      currentAdRef.appendChild(iframe);
    }

    const html =
      '<body><script src="https://adm.shinobi.jp/s/1ace0d006f24678201e5da932f2ddf2f"></script></body>';
    const iframeDocument = iframe.contentWindow?.document;

    if (iframeDocument) {
      iframeDocument.open();
      iframeDocument.write(html);
      iframeDocument.close();
    }

    return () => {
      if (currentAdRef) {
        currentAdRef.removeChild(iframe);
      }
    };
  }, []);

  return (
    <div className="AdAboveNavBar-container">
      <center>
        <div ref={adRef} />
      </center>
    </div>
  );
};

export default AdAboveNavBar;
