import { Helmet } from "react-helmet";

type HeadDataHelmetProps = {
  pageTitle: string;
};

const HeadDataHelmet = ({ pageTitle }: HeadDataHelmetProps) => {
  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - Konwalk`}</title>
        <meta property="og:title" content={`${pageTitle} | Konwalk`} />
        <meta
          property="og:description"
          content="授業中に宿題をしたように、歩く時間も有効に使う。その手助けを行う英単語帳 | 高校英語・TOEIC対応"
        />
        <meta property="og:site_name" content="Konwalk" />
        <meta
          property="og:image"
          content={import.meta.env.VITE_IMAGE_WITH_SHARE_URL}
        />
      </Helmet>
    </>
  );
};

export default HeadDataHelmet;
