import { forwardRef, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const avatarVariants = cva(
  "bg-background-muted",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
);

/**
 * Props for the Avatar component.
 */
export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size">,
    VariantProps<typeof avatarVariants> {
  /**
   * Fallback text to display when image fails to load (usually initials).
   */
  fallback?: string;
  /**
   * Callback fired when the image fails to load.
   */
  onLoadError?: (event: SyntheticEvent<HTMLImageElement>) => void;
  /**
   * Callback fired when the image loads successfully.
   */
  onLoadSuccess?: () => void;
}

/**
 * Avatar component for user images.
 *
 * @remarks
 * Displays a user avatar with fallback support.
 * When no image is provided or it fails to load, displays fallback initials.
 * Automatically shows fallback when image load fails.
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * // With fallback initials
 * <Avatar fallback="JD" alt="John Doe" />
 *
 * // Different sizes
 * <Avatar src="/user.jpg" alt="User" size="lg" />
 *
 * // Square shape
 * <Avatar src="/user.jpg" alt="User" shape="square" />
 *
 * // With error callback
 * <Avatar
 *   src="/user.jpg"
 *   alt="User"
 *   fallback="U"
 *   onLoadError={() => console.log("Image failed to load")}
 * />
 * ```
 */
export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      size,
      shape,
      fallback,
      onLoadError,
      onLoadSuccess,
      onError,
      onLoad,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
      setHasError(true);
      onError?.(event);
      onLoadError?.(event);
    };

    const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
      setIsLoaded(true);
      onLoad?.(event);
      onLoadSuccess?.();
    };

    // Show fallback when no src, or when image failed to load
    const showFallback = (!src || hasError) && fallback;

    if (showFallback) {
      return (
        <div
          className={cn(
            avatarVariants({ size, shape }),
            "inline-flex items-center justify-center",
            "text-foreground",
            "font-medium",
            className
          )}
          role="img"
          aria-label={alt}
        >
          {fallback}
        </div>
      );
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          avatarVariants({ size, shape }),
          "object-cover",
          !isLoaded && "opacity-0",
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

export { avatarVariants };
