/**
 * Configuration options for face detection behavior.
 */
export interface FaceDetectionConfig {
  /** Whether face detection is enabled */
  enabled: boolean;
  /** Target output size in pixels */
  size: number;
  /** Padding multiplier around detected faces */
  padding: number;
}

/**
 * Configuration options for the face crop plugin.
 */
export interface FaceCropConfig {
  /** Source directory containing images to process */
  sourceDir: string;
  /** Categories/subdirectories to process */
  categories: string[];
  /** File extensions to process (e.g., ['.jpg', '.png']) */
  inputExtensions: string[];
  /** Face detection configuration */
  faceDetection: FaceDetectionConfig;
  /** Maximum number of concurrent image processing operations */
  concurrency: number;
  /** Directory for caching processed results */
  cacheDir: string;
}

/**
 * Represents a detected face bounding box.
 */
export interface FaceRect {
  /** X coordinate of the top-left corner */
  x: number;
  /** Y coordinate of the top-left corner */
  y: number;
  /** Width of the bounding box */
  width: number;
  /** Height of the bounding box */
  height: number;
}

/**
 * Metadata about a processed image.
 */
export interface ProcessedImage {
  /** Whether a face was detected in the image */
  hasFace: boolean;
  /** Aspect ratio as a string (e.g., "16:9") */
  aspectRatio: string;
  /** Original image width in pixels */
  originalWidth: number;
  /** Original image height in pixels */
  originalHeight: number;
}

/**
 * Manifest containing metadata for all processed images, organized by category.
 */
export interface ImageManifest {
  [category: string]: {
    [filename: string]: ProcessedImage;
  };
}

/**
 * Represents a processed asset ready for output.
 */
export interface ProcessedAsset {
  /** Output filename */
  fileName: string;
  /** Processed image data */
  source: Buffer;
}
