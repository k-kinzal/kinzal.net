/**
 * Stylelint Configuration for kinzal.net monorepo
 *
 * Enforces design token usage and prevents hardcoded values.
 * This ensures consistency across the design system.
 *
 * @type {import('stylelint').Config}
 */
export default {
  extends: ["stylelint-config-standard"],

  rules: {
    // Disallow hardcoded colors in regular properties
    // BUT allow them in CSS custom property definitions (--color-*)
    "color-no-hex": [
      true,
      {
        message:
          "Use CSS variables (var(--color-*)) or Tailwind classes instead of hex colors",
      },
    ],
    "color-named": [
      "never",
      {
        message: "Use CSS variables or Tailwind classes instead of named colors",
      },
    ],

    // Disallow specific units that should use design tokens
    "declaration-property-unit-disallowed-list": [
      {
        // Font sizes should use rem or design tokens
        "font-size": ["px"],
        // Line heights should be unitless or use design tokens
        "line-height": ["px"],
      },
      {
        message: "Use rem units or design tokens instead of px for {{ property }}",
      },
    ],

    // Warn on !important usage (except for accessibility overrides)
    "declaration-no-important": [
      true,
      {
        message: "Avoid !important. Use more specific selectors or design tokens",
      },
    ],

    // Enforce lowercase for values
    "value-keyword-case": "lower",

    // Ensure consistent font family naming
    "font-family-name-quotes": "always-where-recommended",

    // Disable rules that conflict with Tailwind
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "config",
          "variants",
          "responsive",
          "screen",
          "theme",
          "import",
          "plugin",
          "source",
          "utility",
          "variant",
          "custom-variant",
        ],
      },
    ],

    // Allow Tailwind's theme() function
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "screen", "--alpha"],
      },
    ],

    // Disable selector class pattern (Tailwind uses specific naming)
    "selector-class-pattern": null,

    // Allow custom properties (CSS variables)
    "custom-property-pattern": null,

    // Import notation
    "import-notation": null,
  },

  overrides: [
    {
      // For files that define CSS variables, allow hex colors
      files: ["**/styles/globals.css", "**/styles/tokens.css", "**/styles/*.css"],
      rules: {
        // Allow hex in CSS variable definitions
        "color-no-hex": null,
        "color-hex-length": null,
        // Allow !important for accessibility (prefers-reduced-motion)
        "declaration-no-important": null,
      },
    },
  ],

  // Ignore patterns
  ignoreFiles: ["**/dist/**", "**/node_modules/**", "**/storybook-static/**"],
};
