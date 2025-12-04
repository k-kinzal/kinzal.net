import type { RefObject } from "react";

/**
 * Props for the ImagePlaceholder component.
 */
interface ImagePlaceholderProps {
  /** Ref for intersection observer attachment */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Placeholder displayed while image is loading.
 *
 * @remarks
 * Shows a dark background with 1:1 aspect ratio until
 * the actual image is loaded and ready to display.
 */
export function ImagePlaceholder({ containerRef, className }: ImagePlaceholderProps) {
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
