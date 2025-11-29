/**
 * Spacing tokens for the design system.
 *
 * Based on a 4px base unit for consistent spacing.
 */

export const spacing = {
  /** 0px */
  none: "0",
  /** 4px */
  xs: "0.25rem",
  /** 8px */
  sm: "0.5rem",
  /** 16px */
  md: "1rem",
  /** 24px */
  lg: "1.5rem",
  /** 32px */
  xl: "2rem",
  /** 48px */
  "2xl": "3rem",
  /** 64px */
  "3xl": "4rem",
} as const;

/**
 * Mapping of spacing tokens to Tailwind gap classes.
 */
export const gapClasses = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
} as const;

/**
 * Mapping of spacing tokens to Tailwind padding classes.
 */
export const paddingClasses = {
  none: "",
  xs: "p-1",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
} as const;

export type SpacingToken = keyof typeof spacing;
export type GapToken = keyof typeof gapClasses;
export type PaddingToken = keyof typeof paddingClasses;
