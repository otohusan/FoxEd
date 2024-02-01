import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Location } from "react-router-dom";
import App from "./App";

export function render(url: string | Partial<Location<any>>) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

// // server.js
// import express from "express";
// import fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import express from 'express'
// import { createServer as createViteServer } from 'vite'

// const server = express();

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// const clientDistPath = path.join(__dirname, "../../dist/client");
// // メインのJavaScriptファイル名を取得
// const mainJsFileName = fs
//   .readdirSync(clientDistPath)
//   .find((file) => file.startsWith("main") && file.endsWith(".js"));

// // 静的ファイルを提供
// server.use(express.static(clientDistPath));

// server.get("*", (req, res) => {
//   const appHtml = render(req.url);
//   const html = `
//   <!DOCTYPE html>
//   <html lang="ja">
//     <head prefix="og: https://ogp.me/ns#">
//       <meta charset="UTF-8" />
//       <title>Konwalk</title>
//       <meta
//         name="description"
//         content="授業中に宿題をしたように、歩く時間も有効に使う。その手助けを行う英単語帳 | 高校英語・TOEIC対応"
//       />
//       <link rel="icon" type="image/svg+xml" href="/Konwalk_favicon.svg" />
//       <link
//         rel="stylesheet"
//         href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
//       />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <meta
//         property="og:title"
//         content="Konwalk(コンウォーク) - 歩く時間を無駄にしない英単語帳"
//       />
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content="https://Konwalk.jp" />
//       <meta property="og:site_name" content="Konwalk" />
//       <meta
//         property="og:description"
//         content="授業中に宿題をしたように、歩く時間も有効に使う! その手助けを行う英単語帳Konwalk(コンウォーク)"
//       />
//       <meta property="og:image" content="%VITE_IMAGE_WITH_SHARE_URL%" />
//     </head>
//     <body>
//       <div id="root"><!--outlet-->${appHtml}</div>
//       <script type="module" src="/dist/assets/${mainJsFileName}"></script>
//     </body>
//   </html>
//   `;
//   res.send(html);
// });

// const PORT = process.env.PORT || 8787;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // 例: 'dist/client' ディレクトリ内の静的ファイルを提供
  app.use(express.static(path.join(__dirname, "../client")));

  // ミドルウェアモードで Vite サーバーを作成し、app type を 'custom' に指定します。
  // これにより、Vite 自体の HTML 配信ロジックが無効になり、親サーバーが
  // 制御できるようになります。
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Vite の接続インスタンスをミドルウェアとして使用。独自の express ルータ
  // (express.Route()) を利用する場合は、router.use を使用してください
  // （たとえばユーザーが vite.config.js を編集した後に）サーバーが再起動しても、
  // `vite.middlewares` は同じリファレンスのままです（ただし、新しい Vite の内部スタックと
  // プラグインが注入されたミドルウェアが使用されます）。
  // 次のコードは再起動後でも有効です。
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. index.html を読み込む
      let template = fs.readFileSync(
        path.resolve(__dirname, "../client/index.html"),
        "utf-8"
      );

      // 2. Vite の HTML の変換を適用します。これにより Vite の HMR クライアントが定義され
      //    Vite プラグインからの HTML 変換も適用します。 e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 4. アプリケーションの HTML をレンダリングします。これは entry-server.js から
      //    エクスポートされた `render` 関数が、ReactDOMServer.renderToString() などの
      //    適切なフレームワークの SSR API を呼び出すことを想定しています。
      const appHtml = render(url);

      // 5. アプリケーションのレンダリングされた HTML をテンプレートに挿入します。
      const html = template.replace(`<!--outlet-->`, appHtml);

      // 6. レンダリングされた HTML をクライアントに送ります。
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      // エラーが検出された場合は、Vite にスタックトレースを修正させ、実際のソースコードに
      // マップし直します。
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(8787);
}

createServer();
