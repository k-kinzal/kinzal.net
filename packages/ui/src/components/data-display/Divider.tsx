import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const dividerVariants = cva(
  "border-border",
  {
    variants: {
      orientation: {
        horizontal: "w-full border-t",
        vertical: "h-full border-l self-stretch",
      },
      variant: {
        default: "",
        dashed: "border-dashed",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  }
);

/**
 * Props for the Divider component.
 */
export interface DividerProps
  extends HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {}

/**
 * Divider component for separating content.
 *
 * @remarks
 * A visual separator for dividing sections of content.
 * Supports horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * // Horizontal divider
 * <Stack gap="md">
 *   <Text>Content above</Text>
 *   <Divider />
 *   <Text>Content below</Text>
 * </Stack>
 *
 * // Vertical divider
 * <Stack direction="horizontal" gap="md">
 *   <Text>Left</Text>
 *   <Divider orientation="vertical" className="h-6" />
 *   <Text>Right</Text>
 * </Stack>
 *
 * // Dashed divider
 * <Divider variant="dashed" />
 * ```
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation, variant, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(dividerVariants({ orientation, variant }), className)}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { dividerVariants };
