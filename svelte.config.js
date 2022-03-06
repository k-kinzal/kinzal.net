import fs from 'fs';
import adapter from "@sveltejs/adapter-cloudflare";
import preprocess from "svelte-preprocess";
import {imagetools} from "vite-imagetools";

let pkg = fs.readFileSync("./package.json");

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {})
      },
      plugins: [
        imagetools({force: true})
      ]
    }
  },
};

export default config;
