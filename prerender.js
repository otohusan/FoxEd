import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(
  toAbsolute("dist/client/index-SSR.html"),
  "utf-8"
);

const { render } = await import("./dist/server/entry-server.js");

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute("src/pages"))
  .map((file) => {
    // index.tsxの場合はページを追加する必要はない
    if (file == "index.tsx") {
      return;
    }
    const name = file.replace(/\.tsx$/, "").toLowerCase();
    // ここでrootをどれにするか指定できる
    return name === "choosequizdata" ? `/` : `/${name}`;
  });

(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const appHtml = render(url);

    const html = template.replace(`<!--outlet-->`, appHtml);

    const filePath = `dist/static${url === "/" ? "/index" : url}.html`;

    fs.writeFileSync(toAbsolute(filePath), html);
  }
})();
