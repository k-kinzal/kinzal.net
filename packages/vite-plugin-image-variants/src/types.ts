/**
 * Options for the image variants plugin.
 */
export interface ImageVariantsPluginOptions {
  /**
   * Glob pattern for input images.
   * Path should be relative to the project root.
   * @example './app/images/**\/*.{jpg,jpeg,png}'
   */
  input: string;

  /**
   * Array of vite-imagetools query strings.
   * Each query will be applied to every matched image file.
   *
   * Queries follow vite-imagetools syntax and can include:
   * - Resize: `w=400`, `h=300`, `fit=cover`
   * - Format: `format=avif`, `format=webp`
   * - Custom transforms: `faceCrop` (with vite-plugin-face-crop)
   *
   * @example
   * ```ts
   * queries: [
   *   'w=200&h=200&fit=cover&format=avif',
   *   'w=200&h=200&fit=cover&format=webp',
   *   'w=200&h=200&fit=cover',
   *   'w=1920&fit=inside&format=avif',
   * ]
   * ```
   */
  queries: string[];
}

/**
 * Lazy loader function for image variants.
 * Returns a Promise that resolves to the image URL.
 */
export type ImageVariantLoader = () => Promise<string>;

/**
 * Image variants organized by file path and query.
 * Keys are file paths (e.g., '/app/images/original/img001.jpg'),
 * values are objects mapping query strings to lazy loaders.
 */
export type ImageVariants = Record<string, Record<string, ImageVariantLoader>>;
