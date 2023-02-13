'use strict';

const path = require('path');

const appRoot = path.join(__dirname, '../../');
const appEntry = path.join(appRoot, 'app');
const relevantFilesGlob = '**/*.{html,js,ts,hbs,gjs,gts}';

module.exports = {
  content: [path.join(appEntry, relevantFilesGlob)],
  theme: {
    extend: {},
  },
  presets: [require('@crowdstrike/tailwind-toucan-base')],
  plugins: [],
  safelist: ['theme-light', 'theme-dark'],
};
