---
"@crowdstrike/ember-toucan-styles": major
---

This is a breaking change is it requires that consumers have a way to properly resolve side-affecting CSS imports
(this is commonplace in many webpack and vite apps though).

(ember-auto-import and embroider)-based ember apps support this out of the box.

Here is a tutorial on setting up Tailwind 3 + JIT, CSS imports, and (optionally) CSS-Modules, for those interested https://discuss.emberjs.com/t/ember-modern-css/19614

To migrate to this version of `@crowdstrike/ember-toucan-styles`, remove any previously referenced

```css
@import "@crowdstrike/ember-toucan-styles/scollbar.css";
```

in your CSS.

This is now imported for you via the included service.
