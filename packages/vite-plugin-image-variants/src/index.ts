import path from 'path';
import { glob } from 'tinyglobby';
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import type { ImageVariantsPluginOptions } from './types.js';

export type { ImageVariantsPluginOptions, ImageVariants } from './types.js';

const VIRTUAL_MODULE_ID = 'virtual:image-variants';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;

const DEFAULT_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];

/**
 * Creates a Vite plugin that generates image variant imports for vite-imagetools.
 *
 * This plugin scans for image files and generates static imports with query parameters
 * for each specified variant. The imports are processed by vite-imagetools at build time.
 *
 * The plugin exports a virtual module `virtual:image-variants` containing an object
 * where keys are file paths and values are objects mapping query strings to resolved URLs.
 *
 * @param options - Configuration options for the plugin
 * @returns A Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { imageVariantsPlugin } from '@kinzal-net/vite-plugin-image-variants';
 *
 * export default defineConfig({
 *   plugins: [
 *     imageVariantsPlugin({
 *       input: './app/images/**\/*.{jpg,jpeg,png}',
 *       queries: [
 *         'w=400&h=400&fit=cover&format=avif',
 *         'w=400&h=400&fit=cover&format=webp',
 *         'w=400&h=400&fit=cover',
 *         'w=1920&fit=inside&format=avif',
 *       ],
 *     }),
 *   ],
 * });
 * ```
 *
 * @example
 * ```ts
 * // In your code
 * import { imageVariants } from 'virtual:image-variants';
 *
 * // Get URL for a specific image and query
 * const url = imageVariants['./app/images/photo.jpg']['w=400&format=avif'];
 * ```
 */
export function imageVariantsPlugin(options: ImageVariantsPluginOptions): Plugin {
  const { input, queries } = options;

  let config: ResolvedConfig;
  let imageFilesCache: string[] | null = null;

  /**
   * Scans for image files matching the input pattern.
   * Results are cached until invalidated by file changes.
   */
  async function scanImages(): Promise<string[]> {
    if (imageFilesCache) {
      return imageFilesCache;
    }

    try {
      const files = await glob(input, {
        cwd: config.root,
        absolute: false,
      });

      imageFilesCache = files.sort();
      return imageFilesCache;
    } catch (error) {
      config.logger.warn(
        `[vite-plugin-image-variants] Failed to scan images: ${error instanceof Error ? error.message : String(error)}`
      );
      return [];
    }
  }

  /**
   * Generates the virtual module code with dynamic imports (lazy loading).
   * Images are only processed when actually requested.
   */
  function generateCode(files: string[]): string {
    const lines: string[] = [];

    lines.push('export const imageVariants = {');

    for (const file of files) {
      // Use ./ prefix for consistency
      const key = `./${file}`;
      lines.push(`  '${key}': {`);

      for (const query of queries) {
        const importPath = `./${file}?${query}`;
        // Use dynamic import for lazy loading
        lines.push(`    '${query}': () => import('${importPath}'),`);
      }

      lines.push('  },');
    }

    lines.push('};');

    return lines.join('\n');
  }

  /**
   * Checks if a file is an image based on extension.
   */
  function isImageFile(file: string): boolean {
    const ext = path.extname(file).slice(1).toLowerCase();
    return DEFAULT_IMAGE_EXTENSIONS.includes(ext);
  }

  /**
   * Invalidates the virtual module and triggers a reload.
   */
  function invalidateModule(server: ViteDevServer): void {
    imageFilesCache = null;
    const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
    if (module) {
      server.moduleGraph.invalidateModule(module);
      server.hot.send({ type: 'full-reload' });
    }
  }

  return {
    name: 'vite-plugin-image-variants',

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
        const files = await scanImages();

        if (files.length === 0) {
          config.logger.warn('[vite-plugin-image-variants] No image files found matching the input pattern');
        }

        return generateCode(files);
      }
    },

    configureServer(server) {
      // Watch the input pattern directory
      server.watcher.add(input);

      server.watcher.on('add', (file) => {
        if (isImageFile(file)) {
          config.logger.info(`[vite-plugin-image-variants] Image added: ${path.basename(file)}`);
          invalidateModule(server);
        }
      });

      server.watcher.on('unlink', (file) => {
        if (isImageFile(file)) {
          config.logger.info(`[vite-plugin-image-variants] Image removed: ${path.basename(file)}`);
          invalidateModule(server);
        }
      });
    },

    handleHotUpdate({ file }) {
      if (isImageFile(file)) {
        imageFilesCache = null;
      }
    },
  };
}

export default imageVariantsPlugin;
