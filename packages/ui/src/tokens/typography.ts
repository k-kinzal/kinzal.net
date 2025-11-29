/**
 * Typography tokens for the design system.
 */

export const fontFamily = {
  sans: ["system-ui", "-apple-system", "sans-serif"],
} as const;

export const fontSize = {
  xs: ["0.75rem", { lineHeight: "1rem" }],
  sm: ["0.875rem", { lineHeight: "1.25rem" }],
  base: ["1rem", { lineHeight: "1.5rem" }],
  lg: ["1.125rem", { lineHeight: "1.75rem" }],
  xl: ["1.25rem", { lineHeight: "1.75rem" }],
  "2xl": ["1.5rem", { lineHeight: "2rem" }],
  "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/**
 * Text size classes for components.
 */
export const textSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

/**
 * Heading size classes with font weight.
 */
export const headingSizeClasses = {
  xs: "text-sm font-semibold",
  sm: "text-base font-semibold",
  md: "text-lg font-semibold",
  lg: "text-xl font-bold",
  xl: "text-2xl font-bold",
  "2xl": "text-3xl font-bold",
} as const;

export type TextSize = keyof typeof textSizeClasses;
export type HeadingSize = keyof typeof headingSizeClasses;
