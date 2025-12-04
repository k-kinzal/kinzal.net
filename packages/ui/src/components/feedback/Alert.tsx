import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const alertVariants = cva("px-4 py-3 rounded-md border", {
  variants: {
    variant: {
      info: "bg-status-info-light text-status-info-text border-status-info/20",
      success: "bg-status-success-light text-status-success-text border-status-success/20",
      warning: "bg-status-warning-light text-status-warning-text border-status-warning/20",
      error: "bg-status-error-light text-status-error-text border-status-error/20",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

/**
 * Props for the Alert component.
 */
export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

/**
 * Alert component for displaying messages.
 *
 * @remarks
 * A container for important messages with semantic color variants.
 * Use for notifications, warnings, or status messages.
 *
 * @example
 * ```tsx
 * // Info alert
 * <Alert>This is an informational message.</Alert>
 *
 * // Success alert
 * <Alert variant="success">Operation completed successfully!</Alert>
 *
 * // Error alert
 * <Alert variant="error">An error occurred. Please try again.</Alert>
 * ```
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        {children}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { alertVariants };
