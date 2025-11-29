/**
 * Breakpoint design tokens for responsive design.
 *
 * @remarks
 * Standard breakpoints aligned with common device sizes.
 * Use these tokens for consistent responsive behavior.
 */

/**
 * Breakpoint values in pixels.
 */
export const breakpoints = {
  /** Extra small devices (phones, portrait) */
  xs: 320,
  /** Small devices (phones, landscape) */
  sm: 640,
  /** Medium devices (tablets) */
  md: 768,
  /** Large devices (desktops) */
  lg: 1024,
  /** Extra large devices (large desktops) */
  xl: 1280,
  /** 2X large devices (wide screens) */
  "2xl": 1536,
} as const;

/**
 * Media query strings for use in CSS-in-JS or JavaScript.
 */
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs}px)`,
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  "2xl": `(min-width: ${breakpoints["2xl"]}px)`,
} as const;

/**
 * Breakpoint type for type-safe usage.
 */
export type Breakpoints = typeof breakpoints;
export type BreakpointKey = keyof Breakpoints;
export type BreakpointValue = Breakpoints[BreakpointKey];
