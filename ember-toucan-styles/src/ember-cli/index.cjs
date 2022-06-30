'use strict';

const { configureTailwind } = require('./postcss.cjs');
const { configureCSSModules } = require('./css-modules.cjs');

module.exports = {
  configureTailwind,
  configureCSSModules,
};
