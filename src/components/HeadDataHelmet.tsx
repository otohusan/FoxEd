import { Helmet } from "react-helmet-async";

type HeadDataHelmetProps = {
  pageTitle: string;
  pageDescription?: string;
  pagePath?: string;
};

const HeadDataHelmet = ({
  pageTitle,
  pageDescription,
  pagePath,
}: HeadDataHelmetProps) => {
  return (
    <div>
      <Helmet>
        <title>{`${pageTitle} - Konwalk(コンウォーク)`}</title>
        <meta
          name="description"
          content={
            pageDescription ||
            "授業中に宿題をしたように、歩く時間も有効に使いたい。Konwalk(コンウォーク)はその手助けを行う英単語帳です。 | 高校英語・TOEIC対応"
          }
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* ここからOGP */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={
            pagePath ? `https://Konwalk.jp/${pagePath}` : "https://Konwalk.jp"
          }
        />
        <meta property="og:site_name" content="Konwalk(コンウォーク)" />
        <meta
          property="og:title"
          content="Konwalk(コンウォーク) - 歩く時間を無駄にしない英単語帳"
        />
        <meta
          property="og:description"
          content={
            pageDescription ||
            "授業中に宿題をしたように、歩く時間も有効に使いたい。Konwalk(コンウォーク)はその手助けを行う英単語帳です。 | 高校英語・TOEIC対応"
          }
        />
        <meta
          property="og:image"
          content={import.meta.env.VITE_IMAGE_WITH_SHARE_URL}
        />

        <meta name="twitter:card" content="summary"></meta>
      </Helmet>
    </div>
  );
};

export default HeadDataHelmet;
