"use strict";

const defaultTailwindConfig = {
  presets: [require("@crowdstrike/tailwind-toucan-base")],
};

function configureTailwind({
  tailwindConfig = defaultTailwindConfig,
  ["ember-cli-postcss"]: addonConfig = { compile: {} },
} = {}) {
  return {
    postcssOptions: {
      ...addonConfig,
      compile: {
        map: false /* sourcemaps off for speed */,
        // Helps improve postcss build time as well as the file watch list for TailwindJIT (when we get to it)
        cacheInclude: [
          /.*\.(css|hbs)$/,
          /.*\/lib\/tailwind\/.*\.js$/,
          /.tailwind\.config\.js$/,
          /\/config\/themes\.json/,
        ],
        ...addonConfig.compile,
        // plugin order enforced
        plugins: [
          require("postcss-import"),
          require("tailwindcss")(tailwindConfig),
          require("postcss-nested"),
          require("autoprefixer"),
        ],
      },
    },
  };
}

module.exports = { configureTailwind };
