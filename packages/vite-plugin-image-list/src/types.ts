/**
 * Options for the image list plugin.
 */
export interface ImageListPluginOptions {
  /**
   * Base directory containing images.
   * Path should be relative to the project root.
   * @example './app/images'
   */
  input: string;

  /**
   * Category subdirectories to scan.
   * Each category will be a key in the resulting image list object.
   * @example ['original', 'scrap']
   */
  categories: string[];

  /**
   * File extensions to include (without dot).
   * @defaultValue ['jpg', 'jpeg', 'png']
   * @example ['jpg', 'jpeg', 'png', 'gif']
   */
  extensions?: string[];
}

/**
 * Image list organized by category.
 * Keys are category names, values are arrays of filenames.
 */
export type ImageList = Record<string, string[]>;
