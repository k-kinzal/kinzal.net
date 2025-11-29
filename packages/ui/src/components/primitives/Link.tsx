import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const linkVariants = cva(
  "transition-colors",
  {
    variants: {
      variant: {
        primary: "text-primary hover:text-primary-700 underline-offset-4 hover:underline",
        secondary: "text-foreground-muted hover:text-foreground",
        ghost: "text-foreground hover:text-foreground-muted",
        nav: "text-foreground-muted hover:text-foreground hover:bg-background-muted",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Props for the Link component.
 */
export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {}

/**
 * Styled anchor element for navigation.
 *
 * @remarks
 * Link provides consistent styling for anchor elements with
 * multiple variants for different contexts.
 *
 * @example
 * ```tsx
 * <Link href="/about" variant="primary">About Us</Link>
 * <Link href="/help" variant="secondary" size="sm">Help</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";

export { linkVariants };
