/**
 * Useful when tests need to change the class on the body element.
 * e.g.: Testing themes
 *
 * @example
 *   import { setupThemeSupport } from '@crowdstrike/ember-toucan-styles/test-support';
 *
 *   module('...', function(hooks) {
 *     setupThemeSupport(hooks);
 *
 *     test('...', function() {...});
 *   })
 */
export function setupThemeSupport(hooks: NestedHooks) {
  let originalClasses: IterableIterator<string>;

  hooks.beforeEach(function () {
    originalClasses = document.body.classList.values();

    document.body.classList.remove(...originalClasses);
  });

  hooks.afterEach(function () {
    let classes = document.body.classList.values();

    document.body.classList.remove(...classes);
    document.documentElement.style.removeProperty('color-scheme');

    if (originalClasses) {
      document.body.classList.add(...originalClasses);
    }
  });
}
