/**
 * Transition design tokens for animations.
 *
 * @remarks
 * Provides consistent transition timing and easing values.
 * Use these tokens for smooth, predictable animations.
 */

/**
 * Extended transition duration values in milliseconds.
 */
export const transitionDuration = {
  /** Instant (no animation) */
  instant: 0,
  /** Ultra fast transitions (e.g., focus rings) */
  fastest: 50,
  /** Fast transitions (e.g., button hover) */
  fast: 150,
  /** Normal transitions (e.g., color changes) */
  normal: 200,
  /** Slow transitions (e.g., expand/collapse) */
  slow: 300,
  /** Slower transitions (e.g., page transitions) */
  slower: 500,
  /** Slowest transitions (e.g., complex animations) */
  slowest: 700,
} as const;

/**
 * Extended easing function values.
 */
export const transitionEasing = {
  /** Linear (constant speed) */
  linear: "linear",
  /** Ease in (starts slow) */
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  /** Ease out (ends slow) */
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  /** Ease in-out (starts and ends slow) */
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  /** Bounce effect */
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  /** Smooth spring-like effect */
  spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
} as const;

/**
 * Pre-composed transition strings for common use cases.
 */
export const transition = {
  /** No transition */
  none: "none",
  /** All properties, fast */
  all: `all ${transitionDuration.fast}ms ${transitionEasing.easeInOut}`,
  /** Color changes */
  colors: `color ${transitionDuration.fast}ms ${transitionEasing.easeInOut}, background-color ${transitionDuration.fast}ms ${transitionEasing.easeInOut}, border-color ${transitionDuration.fast}ms ${transitionEasing.easeInOut}`,
  /** Opacity changes */
  opacity: `opacity ${transitionDuration.normal}ms ${transitionEasing.easeInOut}`,
  /** Transform changes */
  transform: `transform ${transitionDuration.normal}ms ${transitionEasing.easeOut}`,
  /** Shadow changes */
  shadow: `box-shadow ${transitionDuration.fast}ms ${transitionEasing.easeInOut}`,
  /** Expand/collapse */
  expand: `height ${transitionDuration.slow}ms ${transitionEasing.easeInOut}, opacity ${transitionDuration.slow}ms ${transitionEasing.easeInOut}`,
} as const;

/**
 * Transition types for type-safe usage.
 */
export type TransitionDuration = typeof transitionDuration;
export type TransitionDurationKey = keyof TransitionDuration;
export type TransitionDurationValue = TransitionDuration[TransitionDurationKey];

export type TransitionEasing = typeof transitionEasing;
export type TransitionEasingKey = keyof TransitionEasing;
export type TransitionEasingValue = TransitionEasing[TransitionEasingKey];

export type Transition = typeof transition;
export type TransitionKey = keyof Transition;
export type TransitionValue = Transition[TransitionKey];
