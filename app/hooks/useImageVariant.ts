import { useState, useEffect } from "react";
import { imageVariants } from "virtual:image-variants";

/**
 * Variant definitions mapping semantic names to vite-imagetools query strings.
 */
export const IMAGE_VARIANTS = {
  "thumb-sm": "faceCrop&w=200&h=200&fit=cover",
  "thumb-md": "faceCrop&w=400&h=400&fit=cover",
  "thumb-lg": "faceCrop&w=600&h=600&fit=cover",
  face: "faceCrop&w=200&h=200&fit=cover",
  full: "w=1920&fit=inside",
} as const;

export type ImageVariant = keyof typeof IMAGE_VARIANTS;
type Format = "avif" | "webp" | "png";

/**
 * Image source URLs for different formats.
 * Note: "fallback" is the original format (typically JPG).
 */
export interface ImageSources {
  avif: string;
  webp: string;
  fallback: string;
}

/**
 * Load state for image sources.
 */
export type LoadState = "idle" | "loading" | "loaded" | "error";

/**
 * Builds a vite-imagetools query string for the specified variant and format.
 */
function buildQuery(variant: ImageVariant, format: Format): string {
  const base = IMAGE_VARIANTS[variant];
  if (format === "png") {
    return base;
  }
  return `${base}&format=${format}`;
}

/**
 * Loads optimized image sources for all supported formats.
 */
async function loadImageSources(
  category: string,
  filename: string,
  variant: ImageVariant
): Promise<ImageSources | null> {
  const key = `/app/images/${category}/${filename}`;
  const variants = imageVariants[key];
  if (!variants) return null;

  const avifQuery = buildQuery(variant, "avif");
  const webpQuery = buildQuery(variant, "webp");
  // Fallback query has no format - keeps original format (usually jpg)
  const fallbackQuery = buildQuery(variant, "png");

  try {
    const [avifResult, webpResult, fallbackResult] = await Promise.all([
      variants[avifQuery]?.(),
      variants[webpQuery]?.(),
      variants[fallbackQuery]?.(),
    ]);

    if (!fallbackResult) return null;

    const fallback = fallbackResult.default;
    const avif = avifResult?.default || fallback;
    const webp = webpResult?.default || fallback;

    return { avif, webp, fallback };
  } catch {
    return null;
  }
}

/**
 * Options for useImageVariant hook.
 */
interface UseImageVariantOptions {
  /** Image category determining the source directory */
  category: "original" | "scrap";
  /** Image filename */
  filename: string;
  /** Image variant determining size and processing */
  variant: ImageVariant;
  /** Whether to enable loading (default: true) */
  enabled?: boolean;
}

/**
 * Result of useImageVariant hook.
 */
interface UseImageVariantResult {
  /** The loaded image sources, or null if not loaded */
  sources: ImageSources | null;
  /** Current loading state */
  loadState: LoadState;
}

/**
 * Hook for loading optimized image sources.
 *
 * @remarks
 * Loads image sources for avif, webp, and png formats.
 * Use the `enabled` option to control when loading starts.
 *
 * @param options - Hook options
 * @returns Object with sources and load state
 *
 * @example
 * ```tsx
 * const { sources, loadState } = useImageVariant({
 *   category: "original",
 *   filename: "img001.jpg",
 *   variant: "thumb-md",
 *   enabled: isVisible,
 * });
 * ```
 */
export function useImageVariant({
  category,
  filename,
  variant,
  enabled = true,
}: UseImageVariantOptions): UseImageVariantResult {
  const [sources, setSources] = useState<ImageSources | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("idle");

  useEffect(() => {
    // Reset when props change
    setSources(null);
    setLoadState("idle");
  }, [category, filename, variant]);

  useEffect(() => {
    if (!enabled || loadState !== "idle") return;

    setLoadState("loading");

    loadImageSources(category, filename, variant)
      .then((result) => {
        setSources(result);
        setLoadState(result ? "loaded" : "error");
      })
      .catch(() => {
        setLoadState("error");
      });
  }, [category, filename, variant, enabled, loadState]);

  return { sources, loadState };
}
