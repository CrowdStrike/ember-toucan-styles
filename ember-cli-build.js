'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

// eslint doesn't know that we can require ourselves :D
// eslint-disable-next-line node/no-extraneous-require
const { configureTailwind } = require('@crowdstrike/ember-toucan-styles');

// Intimate / Private information:
// https://github.com/embroider-build/embroider/blob/main/packages/test-setup/src/index.ts#L85
process.env.EMBROIDER_TEST_SETUP_OPTIONS = 'optimized';

module.exports = function (defaults) {

  let buildParams = {
    ...configureTailwind(),
  };

  let app = new EmberAddon(defaults, buildParams);

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app);
};
