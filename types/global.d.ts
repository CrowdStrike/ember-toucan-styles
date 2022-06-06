// Types for compiled templates
declare module '@crowdstrike/ember-toucan-styles/templates/*' {
  import type { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
