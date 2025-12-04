/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-a11y"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": [
    { from: "../dist", to: "/" }
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
    // Mock virtual:image-list for page component stories
    config.plugins.push({
      name: 'mock-virtual-image-list',
      resolveId(id) {
        if (id === 'virtual:image-list') {
          return '\0virtual:image-list';
        }
      },
      load(id) {
        if (id === '\0virtual:image-list') {
          return `
            export const imageList = {
              original: ["img001.jpg", "img002.jpg", "img003.jpg", "img004.jpg", "img005.jpg", "img006.jpg"],
              scrap: ["img001.png", "img002.png", "img003.png"]
            };
          `;
        }
      }
    });
    return config;
  }
};
export default config;