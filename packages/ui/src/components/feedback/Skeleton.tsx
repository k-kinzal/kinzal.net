import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const skeletonVariants = cva(
  "animate-pulse bg-background-muted",
  {
    variants: {
      variant: {
        /** Rectangular shape (default) */
        default: "rounded-md",
        /** Circular shape for avatars */
        circular: "rounded-full",
        /** Text-like shape with smaller height */
        text: "rounded h-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Props for the Skeleton component.
 */
export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  /**
   * Width of the skeleton. Can be any CSS width value.
   * @defaultValue "100%"
   */
  width?: string | number;
  /**
   * Height of the skeleton. Can be any CSS height value.
   * @defaultValue "1rem"
   */
  height?: string | number;
}

/**
 * Skeleton loading placeholder component.
 *
 * @remarks
 * Displays a pulsing placeholder while content is loading.
 * Use to indicate that content is being fetched.
 *
 * @example
 * ```tsx
 * // Basic skeleton
 * <Skeleton width={200} height={20} />
 *
 * // Circular skeleton for avatar
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * // Text skeleton
 * <Skeleton variant="text" width="60%" />
 *
 * // Card skeleton
 * <div className="space-y-2">
 *   <Skeleton variant="circular" width={40} height={40} />
 *   <Skeleton variant="text" width="80%" />
 *   <Skeleton variant="text" width="60%" />
 * </div>
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width = "100%", height = "1rem", style, ...props }, ref) => {
    const widthValue = typeof width === "number" ? `${width}px` : width;
    const heightValue = typeof height === "number" ? `${height}px` : height;

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant }), className)}
        style={{
          width: widthValue,
          height: heightValue,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { skeletonVariants };
