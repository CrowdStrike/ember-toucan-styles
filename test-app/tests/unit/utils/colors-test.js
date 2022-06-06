import { getColor, getGraphColors } from '@crowdstrike/ember-toucan-styles';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupThemeSupport } from '@crowdstrike/ember-toucan-styles/test-support';

module('Unit | Utils | Colors ', function (hooks) {
  setupTest(hooks);
  setupThemeSupport(hooks);

  test('it can retrieve a swatch colour', async function (assert) {
    let result = getColor('--lines-dark');

    assert.strictEqual(result, '#d9d9d9', 'Colour of swatch 1 retrieved correctly');
  });

  test('it complains on an invalid swatch name', function (assert) {
    assert.throws(
      () => getColor('--my-hot-red-car'),
      /my-hot-red-car/,
      'Throws on an unexpected swatch name',
    );
  });

  test('it returns the color wheel palette color values correctly', function (assert) {
    getGraphColors().forEach((color) => {
      assert.strictEqual(typeof color, 'object', 'color is an object');
      assert.strictEqual(typeof color.swatchName, 'string', 'color object has a swatch name');
      assert.strictEqual(typeof color.swatchClass, 'string', 'color object has a swatch class');
    });
    assert.deepEqual(
      getGraphColors().map((item) => item.swatchName),
      [
        'graph-1',
        'graph-2',
        'graph-3',
        'graph-4',
        'graph-5',
        'graph-6',
        'graph-7',
        'graph-8',
        'graph-9',
        'graph-10',
        'graph-11',
      ],
      `Full color wheel palette colors returned in the correct order`,
    );
  });

  test('provides only as many categorical colors as necessary', function (assert) {
    for (let i = 1; i <= 11; i++) {
      assert.equal(getGraphColors(i).length, i);
    }
  });

  test('provides a maximum of 11 colors', function (assert) {
    assert.throws(() => getGraphColors(12));
  });

  test('changes every color in the palette', function (assert) {
    for (let i = 1; i <= 11; i++) {
      assert.equal(getGraphColors(i).length, new Set(getGraphColors(i)).size);
    }
  });
});
