'use strict';

const mergeTrees = require('broccoli-merge-trees');
const fileCreator = require('broccoli-file-creator');
const cacheKeyForTree = require('calculate-cache-key-for-tree');

const defaultTailwindConfig = {
  presets: [require('@crowdstrike/tailwind-toucan-base')],
};

function configureTailwind({
  tailwindConfig = defaultTailwindConfig,
  ['ember-cli-postcss']: addonConfig = { compile: {} },
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
          require('postcss-import'),
          require('tailwindcss')(tailwindConfig),
          require('postcss-nested'),
          require('autoprefixer'),
        ],
      },
    },
  };
}

function configureCSSModules({ tailwindConfig = defaultTailwindConfig, cssModules = {} } = {}) {
  return {
    cssModules: {
      ...cssModules,
      plugins: [require('postcss-import'), require('tailwindcss')(tailwindConfig)],
    },
  };
}

module.exports = {
  /**
   * Public API utility functions
   */
  configureTailwind,
  configureCSSModules,

  /**
   * Addon Hooks / etc
   */
  name: require('./package').name,

  options: {
    /**
     * The addon needs to support PostCSS, but not actually compile any of it.
     *
     * This is so that the consuming app can use all the same features.
     */
    ...configureTailwind(),
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  },

  // enable file-watching / live-reload
  isDevelopingAddon: () => true,

  treeForAddon(tree) {
    let trees = [
      tree,
      fileCreator(
        '/-private/theme-data.js',
        `export default ${JSON.stringify(require('@crowdstrike/tailwind-toucan-base/themes'))};`,
      ),
    ];
    let mergedTrees = mergeTrees(trees, { annotation: 'Merge extra treesForAddon' });

    return this._super.treeForAddon.call(this, mergedTrees);
  },

  cacheKeyForTree(treeType) {
    return cacheKeyForTree(treeType, this);
  },
};
