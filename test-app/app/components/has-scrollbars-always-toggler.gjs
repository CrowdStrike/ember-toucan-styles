import Component from '@glimmer/component';
import { service } from '@ember/service';
import { on } from '@ember/modifier';

export default class ThemeToggler extends Component {
  <template>
    <button {{on 'click' this.toggle}} class="bg-surface-base p-2 rounded interactive-normal text-titles-and-attributes border">
      Toggle .has-scrollbars-always
    </button>
  </template>

  toggle = () => {
    document.documentElement.classList.toggle('has-scrollbars-always');
  }
}
