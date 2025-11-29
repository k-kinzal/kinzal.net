import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        6: "grid-cols-6",
        12: "grid-cols-12",
      },
      gap: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8",
      },
    },
    defaultVariants: {
      cols: 1,
      gap: "md",
    },
  }
);

/**
 * Props for the Grid component.
 */
export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

/**
 * CSS Grid container with column presets.
 *
 * @remarks
 * Grid provides a simple CSS Grid layout with preset column counts.
 * Useful for gallery layouts and card grids.
 *
 * @example
 * ```tsx
 * <Grid cols={3} gap="lg">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap }), className)}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

export { gridVariants };
