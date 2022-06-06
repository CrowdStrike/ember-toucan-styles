import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupBrowserFakes } from 'ember-browser-services/test-support';
import { setupThemeSupport } from '@crowdstrike/ember-toucan-styles/test-support';

import Service, { inject as service } from '@ember/service';
import { THEMES } from '@crowdstrike/ember-toucan-styles';

module('Service | ThemeManager', function (hooks) {
  setupTest(hooks);
  setupBrowserFakes(hooks, { localStorage: true });
  setupThemeSupport(hooks);

  module('defaults', function (hooks) {
    let service;

    hooks.beforeEach(function () {
      service = this.owner.lookup('service:theme-manager');
    });

    test('currentTheme', function (assert) {
      assert.strictEqual(service.currentTheme, THEMES.LIGHT);
    });

    test('alternateTheme', function (assert) {
      assert.strictEqual(service.alternateTheme, THEMES.DARK);
    });

    test('inactiveThemes', function (assert) {
      assert.deepEqual(service.inactiveThemes, [THEMES.DARK]);
    });

    test('isThemeSwitchingEnabled', function (assert) {
      assert.strictEqual(service.isThemeSwitchingEnabled, true);
    });
  });

  module('#setup', function (hooks) {
    let service;

    hooks.beforeEach(function () {
      service = this.owner.lookup('service:theme-manager');
    });

    test('sets the currentTheme', function (assert) {
      service.setup();

      assert.strictEqual(service.currentTheme, THEMES.LIGHT);
    });

    module('updates the classList on the body element', function () {
      test('sets the default theme', function (assert) {
        service.setup();

        assert.strictEqual(document.body.classList.toString().includes(THEMES.LIGHT), true);
      });

      test('can specify a custom default', function (assert) {
        service.setup(THEMES.DARK);

        assert.strictEqual(document.body.classList.toString().includes(THEMES.DARK), true);
      });
    });

    module('The saved theme is different from the default theme', function (hooks) {
      hooks.beforeEach(function () {
        let localStorage = this.owner.lookup('service:browser/local-storage');

        localStorage.setItem('current-theme', THEMES.DARK);
      });

      test('saved theme is applied to the body element', function (assert) {
        service.setup();

        assert.strictEqual(document.body.classList.toString().includes(THEMES.DARK), true);
      });

      test('currentTheme is updated', function (assert) {
        service.setup();

        assert.strictEqual(service.currentTheme, THEMES.DARK);
      });
    });
  });

  module('#selectTheme', function (hooks) {
    let service;
    let localStorage;

    hooks.beforeEach(function () {
      service = this.owner.lookup('service:theme-manager');
      localStorage = this.owner.lookup('service:browser/local-storage');
    });

    test('theme can be explicitly chosen', function (assert) {
      service.selectTheme(THEMES.LIGHT);
      assert.strictEqual(service.currentTheme, THEMES.LIGHT);

      service.selectTheme(THEMES.DARK);
      assert.strictEqual(service.currentTheme, THEMES.DARK);

      service.selectTheme(THEMES.DARK);
      assert.strictEqual(service.currentTheme, THEMES.DARK);
    });

    test('theme is persisted to localStorage', function (assert) {
      service.selectTheme(THEMES.LIGHT);
      assert.strictEqual(localStorage.getItem('current-theme'), THEMES.LIGHT);

      service.selectTheme(THEMES.DARK);
      assert.strictEqual(localStorage.getItem('current-theme'), THEMES.DARK);
    });
  });

  module('#toggleTheme', function () {
    test('theme toggles between LIGHT and DARK', function (assert) {
      let service = this.owner.lookup('service:theme-manager');

      assert.strictEqual(service.currentTheme, THEMES.LIGHT);

      service.toggleTheme();
      assert.strictEqual(service.currentTheme, THEMES.DARK);

      service.toggleTheme();
      assert.strictEqual(service.currentTheme, THEMES.LIGHT);
    });
  });

  module('#onUpdateTheme', function (hooks) {
    let assertCalled = () => {
      throw new Error('These tests need to set `assertCalled`');
    };

    hooks.beforeEach(function () {
      this.owner.register(
        'service:theme-manager-subscriber',
        class ThemeManagerSubscriber extends Service {
          @service('theme-manager') themeManager;

          constructor(owner) {
            super(owner);
            this.themeManager.registerThemeSwitchListener(this.onUpdateTheme);
          }

          onUpdateTheme(currentTheme, wasSaved) {
            assertCalled(currentTheme, wasSaved);
          }
        },
      );

      // actually create the service we just made
      this.owner.lookup('service:theme-manager-subscriber');
    });

    test('is called on selectTheme', async function (assert) {
      assert.expect(4);

      let service = this.owner.lookup('service:theme-manager');

      assertCalled = (currentTheme, wasSaved) => {
        assert.strictEqual(currentTheme, THEMES.DARK);
        assert.strictEqual(wasSaved, true);
      };

      service.selectTheme(THEMES.DARK);

      assertCalled = (currentTheme, wasSaved) => {
        assert.strictEqual(currentTheme, THEMES.LIGHT);
        assert.strictEqual(wasSaved, false);
      };

      service.selectTheme(THEMES.LIGHT, { shouldSaveTheme: false });
    });
  });
});
