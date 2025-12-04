import { Image } from "@kinzal-net/ui";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import {
  useImageVariant,
  IMAGE_VARIANTS,
  type ImageVariant,
} from "../../hooks/useImageVariant";
import { ImagePlaceholder } from "./ImagePlaceholder";

export { IMAGE_VARIANTS, type ImageVariant };

/**
 * Props for the OptimizedImage component.
 */
interface OptimizedImageProps {
  /** Image category determining the source directory */
  category: "original" | "scrap";
  /** Image filename */
  filename: string;
  /** Image variant determining size and processing */
  variant: ImageVariant;
  /** Whether to load immediately without waiting for intersection */
  priority?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Object fit mode for the image */
  objectFit?: "contain" | "cover";
}

/**
 * Serves optimized images in modern formats with lazy loading.
 *
 * @remarks
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
  const { ref: containerRef, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    rootMargin: "200px",
    triggerOnce: true,
  });

  const { sources, loadState } = useImageVariant({
    category,
    filename,
    variant,
    enabled: priority || isIntersecting,
  });

  if (loadState === "idle" || loadState === "loading" || loadState === "error" || !sources) {
    return <ImagePlaceholder containerRef={containerRef} className={className} />;
  }

  return (
    <picture>
      <source srcSet={sources.avif} type="image/avif" />
      <source srcSet={sources.webp} type="image/webp" />
      <Image
        src={sources.fallback}
        loading={priority ? "eager" : "lazy"}
        objectFit={objectFit}
        className={className}
        alt=""
      />
    </picture>
  );
}
