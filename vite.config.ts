import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.VITE_IMAGE_WITH_SHARE_URL": JSON.stringify(
      process.env.VITE_IMAGE_WITH_SHARE_URL
    ),
  },
  plugins: [react()],
  base:
    process.env.VITE_GITHUB_PAGES === "true"
      ? "/FoxEd/" // レポジトリ名を設定
      : "./",
  build: {
    rollupOptions: {
      input: {
        main:
          process.env.SSR === "true"
            ? resolve(__dirname, "index.html")
            : resolve(__dirname, "index-SSR.html"),
        404: resolve(__dirname, "404.html"),
      },
    },
    outDir: "dist/static",
  },
  ssr: {
    noExternal: ["react-icons", "react-helmet-async"],
  },
});
