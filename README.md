# @crowdstrike/ember-toucan-styles

Ember integration for CrowdStrike's design system: Toucan.

Includes:
- Base CSS and Tailwind configuration automatically integrated into the Ember build pipeline
- Color variables automatically pulled from Figma
- Color utilities at `@crowdstrike/ember-toucan-styles/utils/colors`
- A base `ThemeManager` service, for managing the current style theme from JavaScript -- no included by default, but may be extended
- Testing utilities for qunit tests that affect the current theme.

## Install

```
ember install @crowdstrike/ember-toucan-styles @crowdstrike/tailwind-toucan-base
```

## Compatibility

- ember-source 3.24+
- ember-auto-import 2+
- typecsript 4.5+
- embroider max-compat and max-strict
- @glimmer/tracking 1.1.2+

### App

To configure an Ember App, modify:
 - ember-cli-build.js

```cjs
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

const { configureTailwind } = require('@crowdstrike/ember-toucan-styles');

const tailwindConfig = require('./tailwind.config');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    ...configureTailwind({ tailwindConfig }),
  });

  return app.toTree();
};
```

-  app/styles/app.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

NOTE: if you're also using css-modules, you'll want to import the css-modules
output before `@tailwind base;`

Then, follow instructions for setup on the ember-toucan-styles README

### Addon

```cjs
// ember-cli-build.js

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

const { configureTailwind } = require('@crowdstrike/ember-toucan-styles');

const tailwindConfig = require('./tailwind.config');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    ...configureTailwind({ tailwindConfig }),
  });

  return app.toTree();
};
```

```css
/* tests/dummy/app/styles/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add `ember-cli-postcss` to your `devDependencies`

And lastly, for tests in your addon to have colors, you'll need to set either
`theme-light` or `theme-dark` on the body class.

### If you need to use CSS-Modules

It is recommended to avoid CSS-Modules, as Tailwind is very flexible -- it may
require a different approach to achieve the stylistic goal though.

Follow these steps:
 - remove `ember-cli-postcss` from your addon
 - install `ember-css-modules`
 - change `ember-cli-build.js`

    ```diff
    -const { configureTailwind } = require('@crowdstrike/ember-toucan-styles');
    +const { configureCSSModules } = require('@crowdstrike/ember-toucan-styles');
    ```


## Usage

Then, components may be written following [the tailwind documentation](https://tailwindcss.com/docs/height/#app).

Example:

```hbs
<button
  class="
    flex whitespace-nowrap bg-transparent type-md-tight text-titles-and-attributes
    focus:outline-none"
  type="button"
>
  A Button!
</button>
```

### Using a Custom Theme Manager

#### Setup

Create an `{app,addon}/services/my-theme-manager.js` file, and _at a minimum_,

```js
import { ThemeManager } from '@crowdstrike/ember-toucan-styles';

export default class MyThemeManager extends ThemeManager {
  // your modifications here
}
```

> _**NOTE**_:<br>
> If you are developing an addon and you want your custom theme-manager to also be called `theme-manager`, in your package.json, you'll need to specify that your addon runs "after" `@crowdstrike/ember-toucan-styles`
>```json
> "ember-addon": {
>   "after": [
>     "@crowdstrike/ember-toucan-styles"
>   ]
> }
> ```


#### Initializing the default theme

Somewhere in the consuming app or addon, run

```js
import { inject as service } from '@ember/service';
import { THEMES } from '@crowdstrike/ember-toucan-styles';

class MyClass {
  @service('my-theme-manager') themeManager;

  setup() {
    // using a default theme (THEMES.LIGHT)
    this.themeManager.setup();

    // or with a custom default theme
    this.themeManager.setup(THEMES.DARK);
  }
}
```

This will first checkout the `current-theme` key in local storage and if that doesn't exist, the the argument passed to `setup()` will be used as the default.


#### Responding to behavior from the ThemeManager

It is possible to apply certain behaviors when a theme switch occurs, for example:

```js
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { THEMES, ThemeManager } from '@crowdstrike/ember-toucan-styles';

import { EVENTS } from '@crowdstrike/ui/analytics/ui';

export default class MyThemeManager extends ThemeManager {
  @service('prex') prex;
  @service('analytics') analytics;

  @action
  onUpdateTheme(currentTheme, wasSaved = true) {
    let key = trackingKey(currentTheme);

    if (wasSaved) {
      this.analytics.trackEvent(this, key);
    }

    this.prex.updateTheme(currentTheme);
  }
}

function trackingKey(themeName) {
  switch (themeName) {
    case THEMES.DARK:
      return EVENTS.THEME.DARK;
    case THEMES.LIGHT:
      return EVENTS.THEME.LIGHT;
    default:
      throw new Error(`Theme not recognized: ${themeName}`);
  }
}
```

### Using your own Tailwind Plugins

TODO: Write this
