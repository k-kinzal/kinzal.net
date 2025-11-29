import { forwardRef, memo, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-foreground-inverse hover:bg-primary-700",
        secondary: "bg-background-muted text-foreground border border-border hover:bg-background",
        ghost: "text-foreground hover:bg-background-muted",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Props for the IconButton component.
 */
export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

/**
 * Circular button for icon-only actions.
 *
 * @remarks
 * IconButton is used for icon-only interactions like share, close, or menu toggle.
 * Always provide an aria-label for accessibility.
 *
 * @example
 * ```tsx
 * <IconButton aria-label="Share on Twitter">
 *   <Icon icon={Twitter} />
 * </IconButton>
 * ```
 */
const IconButtonComponent = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButtonComponent.displayName = "IconButton";

/**
 * Memoized IconButton component for optimal performance.
 */
export const IconButton = memo(IconButtonComponent);

IconButton.displayName = "IconButton";

export { iconButtonVariants };
