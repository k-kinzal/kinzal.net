import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-medium",
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
        outline: "border border-primary text-primary hover:bg-primary hover:text-foreground-inverse",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded",
        md: "h-10 px-4 text-base rounded-md",
        lg: "h-12 px-6 text-lg rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/**
 * Props for the Button component.
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * Primary interactive element for user actions.
 *
 * @remarks
 * Button is used to trigger actions. It supports multiple variants
 * for different emphasis levels and sizes for various contexts.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleSubmit}>Submit</Button>
 * <Button variant="secondary" size="sm">Cancel</Button>
 * <Button variant="outline">Learn More</Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
