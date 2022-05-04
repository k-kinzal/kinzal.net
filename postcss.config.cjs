const tailwindcss = require("tailwindcss");
const purgecss = require('@fullhuman/postcss-purgecss');
const purgeHtml = require('purgecss-from-html')
const purgeSvelte = require("purgecss-from-svelte");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");

const config = {
  plugins: [
    tailwindcss(),
    purgecss({
      content: ['**/*.html', '**/*.svelte'],
      css: ['**/*.css'],
      safelist: {
        standard: [/:/, /swiper-/, /ssbc-/],
        deep: [/:/, /swiper-/, /ssbc-/],
        greedy: [/:/, /swiper-/, /ssbc-/]
      },
      extractors: [
        {
          extractor: purgeHtml,
          extensions: ['html']
        },
        {
          extractor: content => purgeSvelte.extract(content),
          extensions: ["svelte"]
        }
      ]
    }),
    cssnano({ preset: 'default' }),
    autoprefixer,
  ],
};

module.exports = config;
