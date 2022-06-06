// build-time file for consuming apps/addons to not get type errors when
// the type checker resolves all types
declare module '@crowdstrike/ember-toucan-styles/-private/theme-data' {
  export interface ColorInfo {
    category: string[];
    hasAlpha: boolean;
    rgbFill: string;
    fill: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
    name: string;
    value: string;
  }

  interface Theme {
    colors: ColorInfo[];
    shadows: Record<string, string>;
  }

  interface ThemeData {
    aliases: { name: string; value: string }[];
    themes: {
      dark: Theme;
      light: Theme;
    };
  }

  const impl: ThemeData;
  export default impl;
}
