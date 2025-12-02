import path from 'path';
import { glob } from 'tinyglobby';
import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite';
import type { ImageVariantsPluginOptions } from './types.js';

export type { ImageVariantsPluginOptions, ImageVariants, ImageVariantLoader } from './types.js';

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
   * Extracts the base directory from a glob pattern.
   * e.g., './app/images/**\/*.{jpg,png}' -> '/app/images'
   */
  function extractBaseDir(pattern: string): string {
    // Remove leading ./ if present
    let normalized = pattern.startsWith('./') ? pattern.slice(1) : pattern;
    // Ensure leading /
    if (!normalized.startsWith('/')) {
      normalized = '/' + normalized;
    }
    // Find the first glob character and take the directory before it
    const globIndex = normalized.search(/[*?{]/);
    if (globIndex === -1) {
      return normalized;
    }
    const beforeGlob = normalized.slice(0, globIndex);
    // Remove trailing slash and filename part if any
    const lastSlash = beforeGlob.lastIndexOf('/');
    return lastSlash > 0 ? beforeGlob.slice(0, lastSlash) : beforeGlob;
  }

  /**
   * Extracts extensions from a glob pattern.
   * e.g., '**\/*.{jpg,jpeg,png}' -> 'jpg,jpeg,png'
   */
  function extractExtensions(pattern: string): string {
    const match = pattern.match(/\.\{([^}]+)\}$/);
    if (match?.[1]) {
      return match[1];
    }
    // Single extension like *.jpg
    const singleMatch = pattern.match(/\.(\w+)$/);
    if (singleMatch?.[1]) {
      return singleMatch[1];
    }
    // Default fallback
    return 'jpg,jpeg,png';
  }

  /**
   * Generates the virtual module code.
   * Uses import.meta.glob for lazy loading in both dev and prod.
   * This provides a consistent API regardless of environment.
   */
  function generateCode(files: string[]): string {
    const lines: string[] = [];

    // Extract base directory and extensions from input pattern
    const baseDir = extractBaseDir(input);
    const extensions = extractExtensions(input);
    const globPattern = `${baseDir}/**/*.{${extensions}}`;

    // Build glob patterns for each query
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      lines.push(`const glob${i} = import.meta.glob('${globPattern}', { query: '${query}', import: 'default' });`);
    }

    lines.push('');
    lines.push('export const imageVariants = {');

    for (const file of files) {
      // Use absolute path from project root
      const key = `/${file}`;
      lines.push(`  '${key}': {`);

      for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        // import.meta.glob returns () => Promise<string> for lazy loading
        lines.push(`    '${query}': glob${i}['${key}'],`);
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
