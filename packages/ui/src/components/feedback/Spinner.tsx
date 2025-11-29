import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const spinnerVariants = cva(
  [
    "inline-block animate-spin rounded-full",
    "border-foreground-muted",
    "border-t-primary",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4 border-2",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[3px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Props for the Spinner component.
 */
export interface SpinnerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Accessible label for screen readers.
   * @defaultValue "Loading"
   */
  label?: string;
}

/**
 * Loading spinner component.
 *
 * @remarks
 * An animated spinner to indicate loading state.
 * Includes accessibility support with role and aria-label.
 *
 * @example
 * ```tsx
 * // Default spinner
 * <Spinner />
 *
 * // Large spinner with custom label
 * <Spinner size="lg" label="Loading content..." />
 *
 * // Inline with text
 * <Stack direction="horizontal" gap="sm" align="center">
 *   <Spinner size="sm" />
 *   <Text>Loading...</Text>
 * </Stack>
 * ```
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, label = "Loading", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(spinnerVariants({ size }), className)}
        {...props}
      >
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

export { spinnerVariants };
