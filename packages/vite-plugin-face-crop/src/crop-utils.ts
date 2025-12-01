import type { FaceRect } from './types.js';

/**
 * Represents a square region with position and size.
 */
export interface SquareRect {
  /** X coordinate of the top-left corner */
  x: number;
  /** Y coordinate of the top-left corner */
  y: number;
  /** Size (width and height) of the square */
  size: number;
}

/**
 * Converts a face detection rectangle to a square.
 *
 * Expands the shorter side to match the longer side, centered on the original rectangle.
 * Does not consider image boundaries.
 *
 * @param rect - The face detection rectangle to convert
 * @returns A square rectangle centered on the original face position
 */
export function toSquareRect(rect: FaceRect): SquareRect {
  const size = Math.max(rect.width, rect.height);
  const centerX = rect.x + rect.width / 2;
  const centerY = rect.y + rect.height / 2;

  const x = Math.round(centerX - size / 2);
  const y = Math.round(centerY - size / 2);

  return { x, y, size };
}

/**
 * Applies padding to expand a square region.
 *
 * Multiplies the size by the padding factor and expands equally in all directions.
 * Does not consider image boundaries.
 *
 * @param rect - The square rectangle to expand
 * @param padding - The padding multiplier (e.g., 2.0 doubles the size)
 * @returns An expanded square rectangle centered on the original position
 */
export function applyPadding(rect: SquareRect, padding: number): SquareRect {
  const newSize = Math.round(rect.size * padding);
  const expansion = (newSize - rect.size) / 2;
  return {
    x: Math.round(rect.x - expansion),
    y: Math.round(rect.y - expansion),
    size: newSize,
  };
}

/**
 * Clips a rectangle to fit within image boundaries.
 *
 * If the rectangle extends beyond the image, adjusts position to fit.
 * If the size exceeds image dimensions, reduces size to fit.
 *
 * @param rect - The square rectangle to clip
 * @param imageWidth - The width of the image in pixels
 * @param imageHeight - The height of the image in pixels
 * @returns A square rectangle guaranteed to be within image bounds
 */
export function clipToImageBounds(
  rect: SquareRect,
  imageWidth: number,
  imageHeight: number
): SquareRect {
  let { x, y, size } = rect;

  size = Math.min(size, imageWidth, imageHeight);

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + size > imageWidth) x = imageWidth - size;
  if (y + size > imageHeight) y = imageHeight - size;

  return { x, y, size };
}

/**
 * Calculates the crop rectangle from a face detection result.
 *
 * Applies the following pipeline:
 * 1. {@link toSquareRect} - Convert face rectangle to square
 * 2. {@link applyPadding} - Expand with padding
 * 3. {@link clipToImageBounds} - Ensure within image boundaries
 *
 * @param faceRect - The detected face rectangle
 * @param padding - The padding multiplier (e.g., 2.0 doubles the crop area)
 * @param imageWidth - The width of the source image in pixels
 * @param imageHeight - The height of the source image in pixels
 * @returns A square crop rectangle centered on the face
 */
export function calculateCropRect(
  faceRect: FaceRect,
  padding: number,
  imageWidth: number,
  imageHeight: number
): SquareRect {
  const square = toSquareRect(faceRect);
  const padded = applyPadding(square, padding);
  const clipped = clipToImageBounds(padded, imageWidth, imageHeight);
  return clipped;
}
