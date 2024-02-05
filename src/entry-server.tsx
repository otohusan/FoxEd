import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Location } from "react-router-dom";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

export async function render(url: string | Partial<Location<any>>) {
  const helmetContext: any = {};

  const appHtml = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return { appHtml, helmet };
}

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8787;

async function createServer() {
  const app = express();

  // 例: 'dist/client' ディレクトリ内の静的ファイルを提供
  const staticFilesPath = path.join(__dirname, "../client");
  app.use(express.static(staticFilesPath));

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

  //TODO: 型定義をする
  app.use("*", async (req: any, res: any, next: any) => {
    const url = req.originalUrl;

    try {
      // 1. index.html を読み込む
      let template = fs.readFileSync(
        path.resolve(__dirname, "../client/index-SSR.html"),
        "utf-8"
      );

      // 2. Vite の HTML の変換を適用します。これにより Vite の HMR クライアントが定義され
      //    Vite プラグインからの HTML 変換も適用します。 e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 4. アプリケーションの HTML をレンダリングします。これは entry-server.js から
      //    エクスポートされた `render` 関数が、ReactDOMServer.renderToString() などの
      //    適切なフレームワークの SSR API を呼び出すことを想定しています。
      const { appHtml } = await render(url);

      // 5. アプリケーションのレンダリングされた HTML をテンプレートに挿入します。
      const html = template.replace(`<!--outlet-->`, appHtml);

      // 6. レンダリングされた HTML をクライアントに送ります。
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      // エラーが検出された場合は、Vite にスタックトレースを修正させ、実際のソースコードに
      // マップし直します。
      vite.ssrFixStacktrace(e);
      const notFoundPath = path.resolve(__dirname, "../client/404.html");
      if (fs.existsSync(notFoundPath)) {
        const notFoundHtml = fs.readFileSync(notFoundPath, "utf-8");
        res.status(404).send(notFoundHtml);
      } else {
        res.status(404).send("Page Not Found");
      }
      next(e);
    }
  });

  app.listen({ port: PORT }, () => {
    console.log("server is running");
  });
}

createServer();
