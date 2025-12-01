import path from 'path';
import { detectAnimeFace, setCacheDir } from './face-detector.js';
import { calculateCropRect } from './crop-utils.js';
import type { TransformFactory, TransformFactoryContext, ImageConfig } from 'imagetools-core';
import type Sharp from 'sharp';
import type { Plugin, ResolvedConfig } from 'vite';

export type { FaceRect } from './types.js';

const DEFAULT_CACHE_DIR = 'node_modules/.vite';
const PLUGIN_CACHE_SUBDIR = 'vite-plugin-face-crop';

/**
 * Options for the face crop plugin.
 */
export interface FaceCropPluginOptions {
  /**
   * Padding multiplier around the detected face.
   * A value of 2.0 means the crop area will be twice the size of the detected face.
   * @defaultValue 2.0
   */
  padding?: number;

  /**
   * Custom cache directory for storing downloaded models.
   * If not specified, uses Vite's cacheDir.
   */
  cacheDir?: string;
}

interface FaceCropConfig {
  faceCrop: '' | 'true';
}

const DEFAULT_PADDING = 2.0;

/**
 * Creates a faceCrop transform for vite-imagetools.
 *
 * @internal
 */
function createTransform(padding: number): TransformFactory<FaceCropConfig> {
  return (config: Partial<ImageConfig & FaceCropConfig>, ctx: TransformFactoryContext) => {
    if (config.faceCrop === undefined) {
      return undefined;
    }

    ctx.useParam('faceCrop');

    return async (image: Sharp.Sharp): Promise<Sharp.Sharp> => {
      const metadata = await image.metadata();

      if (!metadata.width || !metadata.height) {
        return image;
      }

      const sharpAny = image as unknown as { options?: { input?: { file?: string } } };
      const inputPath = sharpAny.options?.input?.file;

      if (!inputPath) {
        return image;
      }

      const faceRect = await detectAnimeFace(inputPath, ctx.logger);

      if (faceRect) {
        const cropRect = calculateCropRect(faceRect, padding, metadata.width, metadata.height);
        return image.extract({
          left: cropRect.x,
          top: cropRect.y,
          width: cropRect.size,
          height: cropRect.size,
        });
      }

      return image;
    };
  };
}

/**
 * Creates a Vite plugin that provides faceCrop transform for vite-imagetools.
 *
 * This plugin detects anime/illustration faces in images and crops to center on them.
 * Uses a fallback chain: animedetect (fast, ~83% accuracy) then YOLO v1.4_s (~95% accuracy).
 *
 * @param options - Configuration options for the plugin
 * @returns A Vite plugin with `getTransform()` method
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { imagetools } from 'vite-imagetools';
 * import { faceCropPlugin } from '@kinzal-net/vite-plugin-face-crop';
 *
 * const faceCrop = faceCropPlugin();
 *
 * export default defineConfig({
 *   plugins: [
 *     faceCrop,
 *     imagetools({
 *       extendTransforms: (builtins) => [faceCrop.getTransform(), ...builtins],
 *     }),
 *   ],
 * });
 * ```
 *
 * @example
 * ```ts
 * // In your code
 * import img from './photo.jpg?faceCrop&w=400&format=avif';
 * ```
 */
export function faceCropPlugin(options: FaceCropPluginOptions = {}): Plugin & {
  getTransform: () => TransformFactory<FaceCropConfig>;
} {
  const padding = options.padding ?? DEFAULT_PADDING;
  let resolvedCacheDir: string | null = null;

  const plugin: Plugin & { getTransform: () => TransformFactory<FaceCropConfig> } = {
    name: 'vite-plugin-face-crop',

    configResolved(config: ResolvedConfig) {
      const baseCacheDir = options.cacheDir ?? config.cacheDir ?? DEFAULT_CACHE_DIR;
      resolvedCacheDir = path.join(baseCacheDir, PLUGIN_CACHE_SUBDIR);
      setCacheDir(resolvedCacheDir);
    },

    getTransform() {
      return createTransform(padding);
    },
  };

  return plugin;
}

/**
 * Creates a faceCrop transform for vite-imagetools.
 *
 * @deprecated Use {@link faceCropPlugin} instead for proper Vite integration.
 *
 * @example
 * ```ts
 * // New recommended usage:
 * const faceCrop = faceCropPlugin();
 * export default defineConfig({
 *   plugins: [
 *     faceCrop,
 *     imagetools({
 *       extendTransforms: (builtins) => [faceCrop.getTransform(), ...builtins],
 *     }),
 *   ],
 * });
 * ```
 */
export function createFaceCropTransform(options: FaceCropPluginOptions = {}): TransformFactory<FaceCropConfig> {
  const padding = options.padding ?? DEFAULT_PADDING;

  // Set cache dir if provided (legacy fallback)
  if (options.cacheDir) {
    setCacheDir(path.join(options.cacheDir, PLUGIN_CACHE_SUBDIR));
  }

  return createTransform(padding);
}

/**
 * Alias for {@link createFaceCropTransform}.
 * @deprecated Use {@link faceCropPlugin} instead.
 */
export const faceCrop = createFaceCropTransform;

export default faceCropPlugin;
