import { forwardRef, memo, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva("inline-flex items-center font-medium rounded-full", {
  variants: {
    variant: {
      default: "bg-foreground-muted/20 text-foreground",
      primary: "bg-primary text-foreground-inverse",
      secondary: "bg-background-muted text-foreground",
      outline: "bg-transparent border border-border text-foreground",
    },
    size: {
      sm: "px-1.5 py-0.5 text-xs",
      md: "px-2 py-0.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

/**
 * Props for the Badge component.
 */
export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/**
 * Badge component for labels and tags.
 *
 * @remarks
 * A small label component for categorization, status, or counts.
 *
 * @example
 * ```tsx
 * // Default badge
 * <Badge>New</Badge>
 *
 * // Primary badge
 * <Badge variant="primary">Featured</Badge>
 *
 * // Outline badge
 * <Badge variant="outline" size="sm">Draft</Badge>
 * ```
 */
const BadgeComponent = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {children}
      </span>
    );
  }
);

BadgeComponent.displayName = "Badge";

/**
 * Memoized Badge component for optimal performance in lists.
 */
export const Badge = memo(BadgeComponent);

Badge.displayName = "Badge";

export { badgeVariants };
