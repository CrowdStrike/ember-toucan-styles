import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import Service, { inject as service } from '@ember/service';

import { ALL_THEMES, DARK, LIGHT } from '../utils/themes';

import type { Theme } from '../utils/themes';
import type { LocalStorageService } from 'ember-browser-services/types';

export default class ThemeManagerService extends Service {
  @service('browser/local-storage') declare storage: LocalStorageService;
  private callbacks: Array<(theme: Theme, shouldSaveTheme: boolean) => void> = [];

  /**
   * @public
   * @abstract
   *
   * Callback for when the theme updates
   *
   * @param currentTheme
   * @param wasSaved
   */
  onUpdateTheme?(currentTheme: Theme, wasSaved: boolean): void;

  /**
   * @public
   *
   * Represents the currently selected theme.
   * Must be one of THEMES
   */
  @tracked currentTheme: Theme = LIGHT;

  /**
   * @public
   *
   * Whether the setup() method has been called
   */
  isSetup = false;

  /**
   * @public
   *
   * Indicator if theme switching is allowed or not.
   *
   * NOTE:
   *  there is a bug that has been carried over from the previous implementation
   *  where this flag is only for UI purposes and doesn't actually provide
   *  safety for preventing the theme from being switched.
   */
  @tracked isThemeSwitchingEnabled = true;

  /**
   * @public
   *
   * Override the currently selected theme, and don't allow theme switching in navbar
   * Useful if a route does not support any other theme
   * The overridden theme can later be restored using clearForceSelectedTheme
   *
   * @param {THEMES} theme
   */
  forceSelectTheme(theme: Theme) {
    this._previouslySelectedTheme = this.currentTheme;
    this._previousIsThemeSwitchingEnabled = this.isThemeSwitchingEnabled;
    this.isThemeSwitchingEnabled = false;
    this.selectTheme(theme, { shouldSaveTheme: false });
  }

  /**
   * @public
   *
   * Restores the theme previously overridden by forceSelectTheme
   * Also restores the previous value of isThemeSwitchingEnabled
   *
   * @param {THEMES} theme
   */
  clearForceSelectedTheme() {
    this.isThemeSwitchingEnabled = this._previousIsThemeSwitchingEnabled;
    this.selectTheme(this._previouslySelectedTheme, { shouldSaveTheme: false });
  }

  registerThemeSwitchListener(callback: (theme: Theme) => void) {
    this.callbacks.push(callback);

    if (!this.isDestroying) {
      registerDestructor(this, () => {
        this.callbacks.splice(this.callbacks.indexOf(callback), 1);
      });
    }
  }

  /**
   * @public
   *
   * Initializes the Theme Manager with a customizable defaultTheme
   *
   * @param {THEMES} defaultTheme
   */
  @action
  setup(defaultTheme: Theme = LIGHT) {
    assert('setup() was already called. To change theme, use selectTheme()', !this.isSetup);

    let savedTheme = this.storage.getItem('current-theme') as Theme;

    if (!ALL_THEMES.includes(savedTheme)) {
      savedTheme = defaultTheme;
    }

    this.currentTheme = savedTheme || defaultTheme;

    document.body.classList.add(this.currentTheme);

    this.notifyThemeChange(false);
    this.isSetup = true;
  }

  /**
   * @public
   * @deprecated
   *
   * At the moment, there are only two themes.
   * This getter returns the theme that is currently *not* active.
   *
   * If more themes are added, it's likely that either this getter
   * will be removed
   */
  get alternateTheme() {
    return this.currentTheme === DARK ? LIGHT : DARK;
  }

  get inactiveThemes() {
    return ALL_THEMES.filter((theme) => theme !== this.currentTheme);
  }

  /**
   * @public
   *
   * Changes the currentTheme
   *
   * @param {THEME} theme - theme to change to
   * @param {Object}
   * @property {Boolean} shouldSaveTheme - flag to control if the theme change should be persisted to localStorage
   */
  @action
  selectTheme(theme: Theme, { shouldSaveTheme = true } = {}) {
    document.body.classList.add(theme);

    this.currentTheme = theme;

    document.body.classList.remove(...this.inactiveThemes);

    if (shouldSaveTheme) {
      this.storage.setItem('current-theme', this.currentTheme);
    }

    this.notifyThemeChange(shouldSaveTheme);
  }

  @action
  notifyThemeChange(shouldSaveTheme: boolean) {
    this.callbacks.forEach((handler) => handler(this.currentTheme, shouldSaveTheme));
  }

  /**
   * @public
   *
   * Toggles between the LIGHT and DARK themes
   *
   * @param {Object}
   * @property {Boolean} shouldSaveTheme - flag to control if the theme change should be persisted to localStorage
   */
  @action
  toggleTheme({ shouldSaveTheme = true } = {}) {
    this.selectTheme(this.alternateTheme, { shouldSaveTheme });
  }

  /**
   * @private
   *
   * The theme that was active before forceSelectTheme overrode it
   */
  _previouslySelectedTheme: Theme = this.currentTheme;

  /**
   * @private
   *
   * The value of isThemeSwitchingEnabled before forceSelectTheme was called
   */
  _previousIsThemeSwitchingEnabled: boolean = this.isThemeSwitchingEnabled;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'theme-manager': ThemeManagerService;
  }
}
