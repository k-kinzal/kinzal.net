import path from 'path';
import { glob } from 'tinyglobby';
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import type { ImageListPluginOptions, ImageList } from './types.js';

export type { ImageListPluginOptions, ImageList } from './types.js';

const VIRTUAL_MODULE_ID = 'virtual:image-list';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

const DEFAULT_EXTENSIONS = ['jpg', 'jpeg', 'png'];

/**
 * Creates a Vite plugin that provides image file list as a virtual module.
 *
 * This plugin scans specified directories for image files and exports them
 * as a virtual module `virtual:image-list`. The module exports an object
 * where keys are category names and values are arrays of filenames.
 *
 * @param options - Configuration options for the plugin
 * @returns A Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { imageListPlugin } from '@kinzal-net/vite-plugin-image-list';
 *
 * export default defineConfig({
 *   plugins: [
 *     imageListPlugin({
 *       input: './app/images',
 *       categories: ['original', 'scrap'],
 *       extensions: ['jpg', 'jpeg', 'png'],
 *     }),
 *   ],
 * });
 * ```
 *
 * @example
 * ```ts
 * // In your code
 * import { imageList } from 'virtual:image-list';
 *
 * // imageList = {
 * //   original: ['img001.jpg', 'img002.png'],
 * //   scrap: ['scrap001.jpg'],
 * // }
 * ```
 */
export function imageListPlugin(options: ImageListPluginOptions): Plugin {
  const {
    input,
    categories,
    extensions = DEFAULT_EXTENSIONS,
  } = options;

  let config: ResolvedConfig;
  let imageListCache: ImageList | null = null;

  /**
   * Scans directories for image files.
   * Results are cached until invalidated by file changes.
   */
  async function scanImages(): Promise<ImageList> {
    if (imageListCache) {
      return imageListCache;
    }

    const result: ImageList = {};
    const extPattern = extensions.length === 1
      ? extensions[0]
      : `{${extensions.join(',')}}`;

    for (const category of categories) {
      const pattern = path.posix.join(input, category, `*.${extPattern}`);

      try {
        const files = await glob(pattern, {
          cwd: config.root,
          absolute: false,
        });

        result[category] = files
          .map((f) => path.basename(f))
          .sort();
      } catch (error) {
        config.logger.warn(
          `[vite-plugin-image-list] Failed to scan category "${category}": ${error instanceof Error ? error.message : String(error)}`
        );
        result[category] = [];
      }
    }

    imageListCache = result;
    return result;
  }

  /**
   * Checks if a file matches the configured image extensions.
   */
  function isImageFile(file: string): boolean {
    const ext = path.extname(file).slice(1).toLowerCase();
    return extensions.includes(ext);
  }

  /**
   * Invalidates the virtual module and triggers a reload.
   */
  function invalidateModule(server: ViteDevServer): void {
    imageListCache = null;
    const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
    if (module) {
      server.moduleGraph.invalidateModule(module);
      server.hot.send({ type: 'full-reload' });
    }
  }

  return {
    name: 'vite-plugin-image-list',

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID;
      }
    },

    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const imageList = await scanImages();
        return `export const imageList = ${JSON.stringify(imageList, null, 2)};`;
      }
    },

    configureServer(server) {
      // Build watch patterns for each category
      const watchPatterns = categories.map((category) => {
        const extPattern = extensions.length === 1
          ? extensions[0]
          : `{${extensions.join(',')}}`;
        return path.posix.join(input, category, `*.${extPattern}`);
      });

      server.watcher.add(watchPatterns);

      server.watcher.on('add', (file) => {
        if (isImageFile(file)) {
          config.logger.info(`[vite-plugin-image-list] Image added: ${path.basename(file)}`);
          invalidateModule(server);
        }
      });

      server.watcher.on('unlink', (file) => {
        if (isImageFile(file)) {
          config.logger.info(`[vite-plugin-image-list] Image removed: ${path.basename(file)}`);
          invalidateModule(server);
        }
      });
    },

    handleHotUpdate({ file }) {
      if (isImageFile(file)) {
        imageListCache = null;
      }
    },
  };
}

export default imageListPlugin;
