'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const {
  configureCSSModules,
  configureTailwind,
} = require('@crowdstrike/ember-toucan-styles/ember-cli');

/**
 * Testing that these utilities are both resolveable from an ember app
 */
console.debug({ configureTailwind, configureCSSModules });

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
