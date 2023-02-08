export const DARK = 'theme-dark';
export const LIGHT = 'theme-light';

export const THEMES = {
  DARK,
  LIGHT,
} as const;

export const ALL_THEMES = Object.values(THEMES);

type ThemeKey = keyof typeof THEMES;
export type Theme = (typeof THEMES)[ThemeKey];
