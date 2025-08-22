import { mergeDeepRight } from "ramda";
import { alias } from "./config/build/config";
import { define, entryPoints, extensions } from "./config/build/constants";
import svgr from "vite-plugin-svgr";
const postCssConfig = require("./postcss.config");

const port = process.env.DEVSERVER_PORT || 8000;

const baseConfig = {
  assetsInclude: ["**/*.yaml"],
  css: { postcss: postCssConfig },
    server: { 
      host: '0.0.0.0', 
      port: port, 
      origin: `http://localhost:${port}`,
      cors: {
        origin: '*', 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      }
  },
  build: {
    manifest: true,
    sourcemap: true,
    cssCodeSplit: false,
  },
  root: "app/javascript/packs",
  resolve: {
    alias,
  },
  define,
  plugins: [
    svgr({
      svgrOptions: { exportType: "default" },
      include: "**/*.svg",
    }),
  ],
};

const viteConfig = mergeDeepRight(baseConfig, {
  resolve: {
    alias,
    extensions,
  },
  rollupOptions: { input: entryPoints },
});

module.exports = viteConfig;
