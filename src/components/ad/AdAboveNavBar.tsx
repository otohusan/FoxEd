import React, { useEffect } from "react";

// 広告タイプの型
type AdmaxAdType = {
  admax_id: string; // 広告ID
  type: string; // PC/SP切替広告なら"switch"
};

// PC/SP切替広告のReactコンポーネント
const AdAboveNavBar: React.FC<{ id: string }> = (props) => {
  useEffect(() => {
    // windowオブジェクトの広告リストを初期化
    const admaxads = (window as any).admaxads as AdmaxAdType[] | undefined;
    if (!admaxads) {
      (window as any).admaxads = [];
    }

    // 広告リストを取得
    const currentAdmaxads = (window as any).admaxads as AdmaxAdType[];

    // 広告リストになかったら追加
    if (!currentAdmaxads.some((ad) => ad.admax_id === props.id)) {
      currentAdmaxads.push({
        admax_id: props.id,
        type: "switch",
      });
    }

    // 外部JSを読み込んで広告リストを実際に表示
    const tag = document.createElement("script");
    tag.src = "https://adm.shinobi.jp/st/t.js";
    tag.async = true;
    document.body.appendChild(tag);

    // アンマウント時にJSタグと広告情報を削除
    return () => {
      try {
        document.body.removeChild(tag);
      } catch (e) {
        console.error("Error removing script tag:", e);
      }
      const adIndex = currentAdmaxads.findIndex(
        (ad) => ad.admax_id === props.id
      );
      if (adIndex !== -1) {
        currentAdmaxads.splice(adIndex, 1);
      }
      (window as any).__admax_tag__ = undefined;
    };
  }, [props.id]);

  return (
    <div
      className="admax-switch"
      data-admax-id={props.id}
      style={{ display: "inline-block" }}
    />
  );
};

export default AdAboveNavBar;
