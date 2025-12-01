import { Image } from "@kinzal-net/ui";
import { imageVariants } from "virtual:image-variants";
import { useState, useEffect, useRef } from "react";

/**
 * Variant definitions mapping semantic names to vite-imagetools query strings.
 */
const VARIANTS = {
  "thumb-sm": "faceCrop&w=200&h=200&fit=cover",
  "thumb-md": "faceCrop&w=400&h=400&fit=cover",
  "thumb-lg": "faceCrop&w=600&h=600&fit=cover",
  "face": "faceCrop&w=200&h=200&fit=cover",
  "full": "w=1920&fit=inside",
} as const;

type Variant = keyof typeof VARIANTS;
type Format = "avif" | "webp" | "png";

interface ImageSources {
  avif: string;
  webp: string;
  png: string;
}

type LoadState = "idle" | "loading" | "loaded" | "error";

function buildQuery(variant: Variant, format: Format): string {
  const base = VARIANTS[variant];
  if (format === "png") {
    return base;
  }
  return `${base}&format=${format}`;
}

async function loadImageSources(
  category: string,
  filename: string,
  variant: Variant
): Promise<ImageSources | null> {
  const key = `./app/images/${category}/${filename}`;
  const variants = imageVariants[key];
  if (!variants) return null;

  const avifQuery = buildQuery(variant, "avif");
  const webpQuery = buildQuery(variant, "webp");
  const pngQuery = buildQuery(variant, "png");

  try {
    const [avifMod, webpMod, pngMod] = await Promise.all([
      variants[avifQuery]?.(),
      variants[webpQuery]?.(),
      variants[pngQuery]?.(),
    ]);

    const png = pngMod?.default;
    if (!png) return null;

    return {
      avif: avifMod?.default || png,
      webp: webpMod?.default || png,
      png,
    };
  } catch {
    return null;
  }
}

interface OptimizedImageProps {
  category: "original" | "scrap";
  filename: string;
  variant: Variant;
  priority?: boolean;
  className?: string;
  objectFit?: "contain" | "cover";
}

/**
 * OptimizedImage - Serves optimized images in modern formats
 *
 * Uses picture element with AVIF and WebP sources for better compression.
 * Images are processed by vite-plugin-face-crop (face detection + crop)
 * and converted to modern formats by vite-imagetools.
 *
 * Images are loaded lazily when they enter the viewport using IntersectionObserver.
 * Use priority={true} to load immediately without waiting for intersection.
 */
export function OptimizedImage({
  category,
  filename,
  variant,
  priority = false,
  className,
  objectFit = "cover",
}: OptimizedImageProps) {
  const [sources, setSources] = useState<ImageSources | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  // Load images when element enters viewport (or immediately if priority)
  useEffect(() => {
    if (loadState !== "idle") return;

    // Priority images load immediately
    if (priority) {
      startLoading();
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startLoading();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading slightly before entering viewport
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [priority, loadState]);

  // Actual loading logic
  function startLoading() {
    setLoadState("loading");

    loadImageSources(category, filename, variant)
      .then((result) => {
        setSources(result);
        setLoadState(result ? "loaded" : "error");
      })
      .catch(() => {
        setLoadState("error");
      });
  }

  // Reset when props change
  useEffect(() => {
    setSources(null);
    setLoadState("idle");
  }, [category, filename, variant]);

  // Placeholder while idle or loading
  if (loadState === "idle" || loadState === "loading") {
    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          backgroundColor: "var(--color-surface-secondary, #1a1a1a)",
          aspectRatio: "1 / 1",
        }}
      />
    );
  }

  // Fallback to original image if processed version not available
  if (loadState === "error" || !sources) {
    const fallback = `/app/images/${category}/${filename}`;
    return (
      <Image
        src={fallback}
        loading={priority ? "eager" : "lazy"}
        objectFit={objectFit}
        className={className}
        alt=""
      />
    );
  }

  return (
    <picture>
      <source srcSet={sources.avif} type="image/avif" />
      <source srcSet={sources.webp} type="image/webp" />
      <Image
        src={sources.png}
        loading={priority ? "eager" : "lazy"}
        objectFit={objectFit}
        className={className}
        alt=""
      />
    </picture>
  );
}
