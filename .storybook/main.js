/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": [
    { from: "../dist", to: "/" },
    { from: "../app", to: "/app" }
  ],
  // Use a custom Vite config for Storybook to avoid React Router plugin conflict
  viteFinal: async (config) => {
    // Remove any React Router plugin that might be inherited
    config.plugins = config.plugins?.filter(
      (plugin) => {
        const name = Array.isArray(plugin) ? plugin[0]?.name : plugin?.name;
        return !name?.includes('react-router');
      }
    );
    return config;
  }
};
export default config;