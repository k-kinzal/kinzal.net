import type { TestRunnerConfig } from "@storybook/test-runner";
import { injectAxe, checkA11y } from "axe-playwright";

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    // Test both light and dark color schemes
    // Tailwind v4's dark: prefix uses @media (prefers-color-scheme: dark)
    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme });
      await checkA11y(page, "#storybook-root", {
        // Only report violations, not passes
        verbose: false,
      });
    }
  },
};

export default config;
