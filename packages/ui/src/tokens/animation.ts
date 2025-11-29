/**
 * Animation tokens for the design system.
 */

export const duration = {
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
} as const;

export const easing = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/**
 * Transition classes for components.
 */
export const transitionClasses = {
  colors: "transition-colors duration-200",
  opacity: "transition-opacity duration-200",
  transform: "transition-transform duration-200",
  all: "transition-all duration-200",
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
