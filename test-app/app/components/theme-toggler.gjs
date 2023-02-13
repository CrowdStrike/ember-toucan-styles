import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';

export default class ThemeToggler extends Component {
  <template>
    Current theme: {{this.themeManager.currentTheme}} <br><br>
    <button {{on 'click' this.toggleTheme}} class="bg-surface-base p-2 rounded interactive-normal text-titles-and-attributes border">
      Change theme
    </button>
  </template>

  @service themeManager;

  toggleTheme = () => this.themeManager.toggleTheme();
}
