'use strict';

const { resolve } = require;

module.exports = {
  presets: [resolve('@babel/preset-env'), resolve('@babel/preset-typescript')],
  plugins: [
    [
      resolve('@babel/plugin-transform-typescript'),
      {
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
        // Default enums are IIFEs
        optimizeConstEnums: true,
      },
    ],
    [
      resolve('@babel/plugin-proposal-decorators'),
      {
        // The stage 1 implementation
        legacy: true,
      },
    ],
    // This exists due to a bug in ember-cli-babel
    // https://github.com/babel/ember-cli-babel/issues/447
    [resolve('@babel/plugin-proposal-class-properties')],
    // eslint-disable-next-line node/no-missing-require
    resolve('@embroider/addon-dev/template-colocation-plugin'),
  ],
};
