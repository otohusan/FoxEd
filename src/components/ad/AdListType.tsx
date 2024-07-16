import React, { useEffect, useRef } from "react";
import "./style/AdAboveNavBar.css";

const AdListType: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.style.width = "330px";
    iframe.style.border = "none";

    const currentAdRef = adRef.current;
    if (currentAdRef) {
      currentAdRef.appendChild(iframe);
    }

    const htmlContent = `
      
      <body>
        <script src="https://adm.shinobi.jp/s/ef4ab80ca32222c17d761ff785c64643"></script>
      </body>
      
    `;

    iframe.srcdoc = htmlContent;

    return () => {
      if (currentAdRef) {
        currentAdRef.removeChild(iframe);
      }
    };
  }, []);

  return (
    <div className="AdListType-container">
      <center>
        <div ref={adRef} />
      </center>
    </div>
  );
};

export default AdListType;
