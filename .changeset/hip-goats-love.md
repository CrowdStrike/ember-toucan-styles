---
"@crowdstrike/ember-toucan-styles": patch
---

Fix scrollbar contrast when darkmode is active by flipping [color-scheme][mdn-color-scheme]
to `dark`.

Previously, the browser would retain the "normal" color scheme contrast of the scrollbar, which
is good for light-mode themes.

[mdn-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
