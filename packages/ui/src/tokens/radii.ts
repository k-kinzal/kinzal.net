/**
 * Border radius tokens for the design system.
 */

export const radii = {
  none: "0",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
} as const;

/**
 * Border radius classes for components.
 */
export const radiusClasses = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

export type RadiusToken = keyof typeof radii;
