import { Helmet } from "react-helmet";

type HeadDataHelmetProps = {
  pageTitle: string;
  pageDescription?: string;
};

const HeadDataHelmet = ({
  pageTitle,
  pageDescription,
}: HeadDataHelmetProps) => {
  return (
    <div>
      <Helmet>
        <title>{`${pageTitle} - Konwalk`}</title>
        <meta
          name="description"
          content={
            pageDescription ||
            "授業中に宿題をしたように、歩く時間も有効に使う。その手助けを行う英単語帳 | 高校英語・TOEIC対応"
          }
        />
        <meta
          property="og:title"
          content="Konwalk(コンウォーク) - 歩く時間を無駄にしない英単語帳"
        />
        <meta
          property="og:description"
          content={
            pageDescription ||
            "授業中に宿題をしたように、歩く時間も有効に使う。その手助けを行う英単語帳 | 高校英語・TOEIC対応"
          }
        />
        <meta property="og:site_name" content="Konwalk" />
        <meta
          property="og:image"
          content={import.meta.env.VITE_IMAGE_WITH_SHARE_URL}
        />
      </Helmet>
    </div>
  );
};

export default HeadDataHelmet;
