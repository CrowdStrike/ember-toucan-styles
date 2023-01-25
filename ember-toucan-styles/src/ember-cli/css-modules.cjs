"use strict";

const defaultTailwindConfig = {
  presets: [require("@crowdstrike/tailwind-toucan-base")],
};

function configureCSSModules({
  tailwindConfig = defaultTailwindConfig,
  cssModules = {},
} = {}) {
  return {
    cssModules: {
      ...cssModules,
      plugins: [
        require("postcss-import"),
        require("tailwindcss")(tailwindConfig),
      ],
    },
  };
}

module.exports = { configureCSSModules };
