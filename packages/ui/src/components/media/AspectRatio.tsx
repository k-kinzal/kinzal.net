import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the AspectRatio component.
 */
export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Aspect ratio preset.
   * - `square`: 1:1
   * - `video`: 16:9
   * - `portrait`: 3:4
   * - `wide`: 21:9
   * @default "square"
   */
  ratio?: "square" | "video" | "portrait" | "wide";
}

/**
 * Container that maintains aspect ratio.
 *
 * @remarks
 * AspectRatio ensures children maintain a consistent aspect ratio.
 * Useful for images and videos in responsive layouts.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio="video">
 *   <Image src="/video-thumbnail.jpg" alt="Video" />
 * </AspectRatio>
 * ```
 */

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = "square", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          {
            "aspect-square": ratio === "square",
            "aspect-video": ratio === "video",
            "aspect-[3/4]": ratio === "portrait",
            "aspect-[21/9]": ratio === "wide",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AspectRatio.displayName = "AspectRatio";
