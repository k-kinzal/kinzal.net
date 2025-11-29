import { forwardRef, type ImgHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the Image component.
 */
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * How the image should be resized to fit its container.
   * @default "cover"
   */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

/**
 * Enhanced img element with object-fit control.
 *
 * @remarks
 * Image component with lazy loading by default and object-fit options.
 * Always provide alt text for accessibility.
 *
 * @example
 * ```tsx
 * <Image
 *   src="/photo.jpg"
 *   alt="A beautiful sunset"
 *   objectFit="cover"
 * />
 * ```
 */

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, objectFit = "cover", loading = "lazy", alt = "", ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn(
          "transition-opacity duration-500",
          {
            "object-contain": objectFit === "contain",
            "object-cover": objectFit === "cover",
            "object-fill": objectFit === "fill",
            "object-none": objectFit === "none",
            "object-scale-down": objectFit === "scale-down",
          },
          className
        )}
        loading={loading}
        alt={alt}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";
