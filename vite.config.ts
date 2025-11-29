import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";

export default defineConfig(({ command }) => ({
  plugins: [reactRouter()],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        // Only use PurgeCSS in build mode
        ...(command === "build"
          ? [
              purgecss({
                content: ["./app/**/*.tsx", "./app/**/*.ts"],
                safelist: [/:target/, /:not/],
              }),
            ]
          : []),
      ],
    },
  },
}));
