import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { getChartColors, getChartNeutralColors, getColor, getGraphColors } from '@crowdstrike/ember-toucan-styles';

import { setupThemeSupport } from '@crowdstrike/ember-toucan-styles/test-support';

const graphColors = [
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
]

const chartColors = [
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
  'chart-6',
  'chart-7',
  'chart-8',
  'chart-9',
  'chart-10',
]

const chartNeutralColors = [
  'chart-neutral-1',
  'chart-neutral-2',
]

const paletteProperties = {
  graph: {
    max: 11,
    colors: graphColors,
    getColors: getGraphColors,
  },
  chart: {
    max: 10,
    colors: chartColors,
    getColors: getChartColors,
  },
  'chart-neutral': {
    max: 2,
    colors: chartNeutralColors,
    getColors: getChartNeutralColors,
  },
  'charts-with-neutral': {
    max: 12,
    colors: [...chartColors, ...chartNeutralColors],
    getColors: (count = 12) => getChartColors(count, { includeNeutrals: true }),
  }
}

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
      'Throws on an unexpected swatch name'
    );
  });

  Object.keys(paletteProperties).map(palette=> {
    const { colors, getColors, max } = paletteProperties[palette]

    test(`it returns the ${palette} color wheel palette color values correctly`, function (assert) {
      let paletteColors = getColors();

      assert.expect(paletteColors.length * 3 + 1);

      paletteColors.forEach((color) => {
        assert.strictEqual(typeof color, 'object', 'color is an object');
        assert.strictEqual(typeof color.swatchName, 'string', 'color object has a swatch name');
        assert.strictEqual(typeof color.swatchClass, 'string', 'color object has a swatch class');
      });
      assert.deepEqual(
        paletteColors.map((item) => item.swatchName),
        colors,
        `Full color wheel palette colors returned in the correct order`
      );
    });

    test(`provides only as many categorical ${palette} colors as necessary`, function (assert) {
      assert.expect(max);

      for (let i = 1; i <= max; i++) {
        assert.strictEqual(getColors(i).length, i);
      }
    });

    test(`provides a maximum of ${max} ${palette} colors`, function (assert) {
      assert.throws(() => getColors(max + 1));
    });

    test(`changes every color in the ${palette} palette`, function (assert) {
      assert.expect(max);

      for (let i = 1; i <= max; i++) {
        assert.strictEqual(getColors(i).length, new Set(getColors(i)).size);
      }
    });
  })
});
