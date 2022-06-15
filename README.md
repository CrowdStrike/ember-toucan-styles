# @crowdstrike/ember-toucan-styles

Ember integration for CrowdStrike's design system: Toucan.

Includes:
- Base CSS and Tailwind configuration automatically integrated into the Ember build pipeline
- Color variables automatically pulled from Figma
- Color utilities at `@crowdstrike/ember-toucan-styles/utils/colors`
- A base `ThemeManager` service, for managing the current style theme from JavaScript -- no included by default, but may be extended
- Testing utilities for qunit tests that affect the current theme.

[Setup](#setup)
  - [Tailwind 3](#tailwind-3)
    - [App](#app-tailwind-3)
  - [Tailwind 2](#tailwind-2)
    - [App](#app-tailwind-2)
    - [v1 Addons](#v1addon-tailwind-2)
    - [CSS-Modules](#css-modules)

[Usage](#usage)
  - [Scrollbar Styles](#scrollbar-styles)
  - [Custom Theme Manager](#using-a-custom-theme-manager)
  - [Setting the Default Theme](#setting-the-default-theme)
  - [Responding to Theme Changes](#responding-to-theme-changes)
  - [Using Tailwind Plugins](#using-your-own-tailwind-plugins)


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

## Setup

### Tailwind 3

<details><summary>
  <a name="#app-tailwind-3" href="#app-tailwind-3">App</a>
</summary>

1. Create an ember app.
   You don't have to start with a fresh ember app!

2. Add tailwind however you like.
  An easy approach is
  ```bash
  # In your terminal
  npx ember-apply tailwind
  ```

3. Install this library.
  ```bash
  # In your terminal
  pnpm add @crowdstrike/ember-toucan-styles @crowdstrike/tailwind-toucan-base
  ```

4. Add the toucan-base plugin to your tailwind config's plugin list.
  ```js
  // config/tailwind/tailwind.config.js
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
    presets: [
      require('@crowdstrike/tailwind-toucan-base')
    ],
    safelist: [
      'theme-dark',
      'theme-light',
    ]
  };

  ```

5. Create a button to toggle the theme.
  ```bash
  # In your terminal
  ember g theme-toggle -gc
  ```

6. Add code to theme-toggle to toggle the theme (and to observe that the theme is toggling).
  Today, Toucan only supports light and dark mode, so this toggle will flip bteween the light theme and dark theme.
  ```js
  // app/components/theme-toggle.js
  import Component from '@glimmer/component';
  import { service } from '@ember/service';

  export default class DemoComponent extends Component {
    @service themeManager;

    toggle = () => this.themeManager.toggleTheme();
  }
  ```
  ```hbs
  {{! app/components/theme-toggle.hbs }}
  <button
    class="
      flex whitespace-nowrap bg-surface-base type-md-tight text-titles-and-attributes
      focus:outline-none p-2 rounded"
    {{on 'click' this.toggle}}
  >
    toggle
  </button>
  ```

  More of our colors and tailwind classes can be found here: https://tailwind-toucan-base.pages.dev/


7. Invoke `<ThemeToggle>` in `app/templates/application.hbs`.
  ```hbs
  <ThemeToggle />
  ```

8. Start both the ember dev server and the tailwind build.
  ```bash
  # in terminal 1
  pnpm start
  # in terminal 2
  pnpm tailwind:watch
  ```

9. A local server will boot at `http://localhosts:4200` and clicking the rendered button will toggle the background color.


------------------------------

Note that if you're using embroider + webpack, you also have the option to follow the popular guides on setting up tailwind with webpack

</details>

### Tailwind 2

<details><summary>
  <a name="#app-tailwind-2" href="#app-tailwind-2">App</a>
</summary>


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


</details>

<details><summary>
  <a name="#v1addon-tailwind-2" href="#v1addon-tailwind-2">V1 Addon</a>
</summary>

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

</details>


<details><summary>
  <a name="#css-modules" href="#css-modules">CSS Modules in Apps</a>
</summary>

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

    To use this in an addon, you'll want to apply these to the `options` object of the v1 addon's index.js.
    V2 Addons do not support app-build modifications, so the app would need to configure css-modules support.


## Usage

Components may be written following [the tailwind documentation](https://tailwindcss.com/docs/height/#app).
Common CSS classes provided by the Toucan preset for Tailwind can be [viewed here](https://tailwind-toucan-base.pages.dev/)
( [Source Code here](https://github.com/CrowdStrike/tailwind-toucan-base) ).

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

</details>

### Scrollbar Styles

To get toucan-themed scrollbars in browsers that support scrollbar customization

```css
@import '@crowdstrike/ember-toucan-styles/scollbar.css'
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


#### Setting the Default Theme

Somewhere in the consuming app or addon, run

```js
import { inject as service } from '@ember/service';
import { THEMES } from '@crowdstrike/ember-toucan-styles';

class MyClass {
  @service themeManager;
  // or @service('my-theme-manager') themeManager;

  setup() {
    // using a default theme (THEMES.LIGHT)
    this.themeManager.setup();

    // or with a custom default theme
    this.themeManager.setup(THEMES.DARK);
  }
}
```

This will first checkout the `current-theme` key in local storage and if that doesn't exist, the the argument passed to `setup()` will be used as the default.


#### Responding to Theme Changes

It is possible to apply certain behaviors when a theme switch occurs, for example:

```js
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { THEMES, ThemeManager } from '@crowdstrike/ember-toucan-styles';

import { EVENTS } from '@crowdstrike/ui/analytics/ui';

export default class MyThemeManager extends ThemeManager {
  @service externalGraphics;
  @service analytics;

  @action
  onUpdateTheme(currentTheme, wasSaved = true) {
    let key = trackingKey(currentTheme);

    if (wasSaved) {
      this.analytics.trackEvent(this, key);
    }

    this.externalGraphics.updateTheme(currentTheme);
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

Add them to your .tailwind.config.js, as normal in https://tailwindcss.com/docs/plugins
