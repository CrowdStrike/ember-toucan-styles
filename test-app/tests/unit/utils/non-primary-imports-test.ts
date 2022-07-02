import { module, test } from 'qunit';

import * as colors from '@crowdstrike/ember-toucan-styles/utils/colors';
import * as themes from '@crowdstrike/ember-toucan-styles/utils/themes';

module('Unit | Utils | non-primary imports', function () {
  test('themes', function (assert) {
    assert.ok(themes);
    assert.ok(themes.ALL_THEMES);
  });

  test('colors', function (assert) {
    assert.ok(colors);
    assert.ok(colors.SEVERITY_COLORS);
  });
});
