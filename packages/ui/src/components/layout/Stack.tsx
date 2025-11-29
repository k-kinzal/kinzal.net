import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const stackVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
      },
      wrap: {
        true: "flex-wrap",
        false: "",
      },
    },
    defaultVariants: {
      direction: "vertical",
      gap: "md",
      align: "stretch",
      justify: "start",
      wrap: false,
    },
  }
);

/**
 * Props for the Stack component.
 */
export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

/**
 * Flexbox container for vertical/horizontal layouts.
 *
 * @remarks
 * Stack is a flexible layout component for arranging children
 * in a row or column with consistent spacing.
 *
 * @example
 * ```tsx
 * <Stack direction="horizontal" gap="lg" align="center">
 *   <span>Item 1</span>
 *   <span>Item 2</span>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({ direction, gap, align, justify, wrap }),
          className
        )}
        {...props}
      />
    );
  }
);

Stack.displayName = "Stack";

export { stackVariants };
