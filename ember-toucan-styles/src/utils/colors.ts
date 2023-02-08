import { assert } from '@ember/debug';

import themeData from '@crowdstrike/tailwind-toucan-base/theme-data';

import type { ColorInfo } from '@crowdstrike/tailwind-toucan-base/theme-data';

export const SEVERITY_COLORS = {
  INFORMATIONAL: 'informational',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

const PRIORITY_COLOR_SWATCHES = [
  `--${SEVERITY_COLORS.LOW}`,
  `--${SEVERITY_COLORS.MEDIUM}`,
  `--${SEVERITY_COLORS.HIGH}`,
  `--${SEVERITY_COLORS.CRITICAL}`,
] as const;

const PRIORITY_COLOR_TEXT_CLASSES = [
  `text-${SEVERITY_COLORS.LOW}`,
  `text-${SEVERITY_COLORS.MEDIUM}`,
  `text-${SEVERITY_COLORS.HIGH}`,
  `text-${SEVERITY_COLORS.CRITICAL}`,
] as const;

const SEVERITY_COLOR_NAMES = [
  `${SEVERITY_COLORS.INFORMATIONAL}`, // Informational
  `${SEVERITY_COLORS.LOW}`, // Low
  `${SEVERITY_COLORS.MEDIUM}`, // Medium
  `${SEVERITY_COLORS.HIGH}`, // High
  `${SEVERITY_COLORS.CRITICAL}`, // Critical
] as const;

const SEVERITY_COLOR_TEXT_CLASSES = [
  `text-${SEVERITY_COLORS.INFORMATIONAL}`, // Informational
  `text-${SEVERITY_COLORS.LOW}`, // Low
  `text-${SEVERITY_COLORS.MEDIUM}`, // Medium
  `text-${SEVERITY_COLORS.HIGH}`, // High
  `text-${SEVERITY_COLORS.CRITICAL}`, // Critical
] as const;

export const GRAPH_COLORS = getGraphColors();

export function getPriorityColorSwatch(priorityId: number) {
  return PRIORITY_COLOR_SWATCHES[priorityId];
}

export function getPriorityColorClass(priorityId: number) {
  return PRIORITY_COLOR_TEXT_CLASSES[priorityId];
}

export function getPriorityColors() {
  return PRIORITY_COLOR_SWATCHES.map((swatch) => ({
    color: getColor(swatch),
    swatch,
  }));
}

export function getSeverityColorName(severityId: number) {
  return SEVERITY_COLOR_NAMES[severityId];
}

export function getSeverityColorClass(severityId: number) {
  return SEVERITY_COLOR_TEXT_CLASSES[severityId];
}

export function getSeverityNameColorClass(
  severity: (typeof SEVERITY_COLORS)[keyof typeof SEVERITY_COLORS]
) {
  return getSeverityColorClass(Object.values(SEVERITY_COLORS).findIndex((s) => s === severity));
}

// gets a colour scale with max contrast for a given number of items
export function getColorScale(numItems: number) {
  let numColors = GRAPH_COLORS.length;

  return Array.from({ length: numItems }, (_, i) => GRAPH_COLORS[(i + 3) % numColors]);
}

export function getGraphColors(count = 11) {
  assert(`requested ${count} graph colors, more than the allowed maximum of 11`, count <= 11);

  let currentTheme = getCurrentTheme();

  const VALID_GRAPH_COLOR = /graph-(\d+)/;

  const swatches = Object.values(themeData.themes[currentTheme].colors)
    .filter(({ name }) => VALID_GRAPH_COLOR.test(name))
    .map(({ name }) => ({
      swatchName: name,
      swatchClass: `text-${name}`,
      i: parseInt(name.substring(6)),
    }))
    .sort((a, b) => a.i - b.i);

  const _ = null;
  const [a, b, c, d, e, f, g, h, i, j, k] = swatches;

  // these color combinations were determined manually,
  // and the goal of this syntax is to make it easy
  // to follow a single color through the matrix
  const sorted = [
    [a, _, _, _, _, _, _, _, _, _, _],
    [a, e, _, _, _, _, _, _, _, _, _],
    [a, c, e, _, _, _, _, _, _, _, _],
    [a, c, d, e, _, _, _, _, _, _, _],
    [a, b, c, d, e, _, _, _, _, _, _],
    [a, b, c, d, e, j, _, _, _, _, _],
    [a, b, c, d, e, g, j, _, _, _, _],
    [a, b, c, d, e, f, g, j, _, _, _],
    [a, b, c, d, e, f, g, i, j, _, _],
    [a, b, c, d, e, f, g, i, j, k, _],
    [a, b, c, d, e, f, g, h, i, j, k],
  ];

  const index = count - 1;
  const swatch = sorted[index];

  return swatch.filter((color) => color !== null);
}

export function getColor(swatchName: string) {
  let currentTheme = getCurrentTheme();
  let { colors } = themeData.themes[currentTheme];

  let cleanedName = swatchName.replace(/^--/, '');

  // Widen the type of `colors` for this particular use case.
  // `colors` is a _specific_ type for the entire JSON document, allowing hi-fi intellisense.
  // For this function though, we don't care about that level of fidelity.
  let color = (colors as ColorInfo[]).find((color) => color.name === cleanedName);

  assert(`Invalid swatch name supplied: '${swatchName}'`, color);

  return color.value;
}

function getCurrentTheme() {
  let theme = [...document.body.classList].find((a) => a.startsWith('theme')) || 'theme-light';

  return theme.substring(6) as 'light' | 'dark';
}
