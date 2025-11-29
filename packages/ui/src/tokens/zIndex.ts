/**
 * Z-index design tokens for layering.
 *
 * @remarks
 * Provides consistent z-index values for proper element stacking.
 * Use these tokens instead of arbitrary z-index values.
 */

/**
 * Z-index scale for layering elements.
 */
export const zIndex = {
  /** Below normal content (e.g., backgrounds) */
  behind: -1,
  /** Default/base layer */
  base: 0,
  /** Raised elements (e.g., cards, buttons) */
  raised: 10,
  /** Dropdown menus */
  dropdown: 1000,
  /** Sticky headers/footers */
  sticky: 1020,
  /** Fixed position elements */
  fixed: 1030,
  /** Modal backdrop */
  modalBackdrop: 1040,
  /** Modal content */
  modal: 1050,
  /** Popover/tooltip */
  popover: 1060,
  /** Toast notifications */
  toast: 1070,
  /** Maximum priority (e.g., loading overlays) */
  max: 9999,
} as const;

/**
 * Z-index type for type-safe usage.
 */
export type ZIndex = typeof zIndex;
export type ZIndexKey = keyof ZIndex;
export type ZIndexValue = ZIndex[ZIndexKey];
