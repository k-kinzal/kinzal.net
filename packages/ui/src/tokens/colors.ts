/**
 * Color tokens for the design system.
 *
 * These values are the single source of truth for colors.
 * They are used in both Tailwind config and CSS variables.
 */

export const colors = {
  /** Primary brand color */
  primary: {
    DEFAULT: "#3b82f6",
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },

  /** Background colors */
  background: {
    DEFAULT: "#ffffff",
    dark: "#1a1a1a",
    muted: "#f5f5f5",
    "muted-dark": "#2a2a2a",
  },

  /** Foreground (text) colors */
  foreground: {
    DEFAULT: "#171717",
    muted: "#737373",
    inverse: "#fafafa",
    "muted-dark": "#a3a3a3",
  },

  /** Border colors */
  border: {
    DEFAULT: "#e5e5e5",
    dark: "#404040",
  },

  /** Semantic status colors */
  status: {
    success: {
      DEFAULT: "#22c55e",
      light: "rgba(34, 197, 94, 0.1)",
      text: "#15803d",
      "text-dark": "#4ade80",
    },
    warning: {
      DEFAULT: "#eab308",
      light: "rgba(234, 179, 8, 0.1)",
      text: "#a16207",
      "text-dark": "#facc15",
    },
    error: {
      DEFAULT: "#ef4444",
      light: "rgba(239, 68, 68, 0.1)",
      text: "#b91c1c",
      "text-dark": "#f87171",
    },
    info: {
      DEFAULT: "#3b82f6",
      light: "rgba(59, 130, 246, 0.1)",
      text: "#1d4ed8",
      "text-dark": "#60a5fa",
    },
  },
} as const;

export type ColorToken = typeof colors;
