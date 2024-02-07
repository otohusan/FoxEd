import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const { render } = await import("./dist/server/entry-server.js");

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute("src/pages"))
  .map((file) => {
    // index.tsxの場合はページを追加する必要はない
    if (file == "index.tsx") {
      return;
    }
    const name = file.replace(/\.tsx$/, "");
    // ここでrootをどれにするか指定できる
    return name === "PlayQuiz" ? `/` : `/${name}`;
  });

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    if (!url) {
      return;
    }

    const template = fs.readFileSync(
      toAbsolute("dist/static/index-SSR.html"),
      "utf-8"
    );

    const { appHtml, helmet } = await render(url);

    const html = template
      .replace(
        `<!--head-outlet-->`,
        `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `
      )
      .replace(`<!--outlet-->`, appHtml);

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;

    fs.writeFileSync(toAbsolute(filePath), html);
  }
})();
