import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/**
 * Available heading levels.
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const headingVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: "text-sm font-semibold",
      sm: "text-base font-semibold",
      md: "text-lg font-semibold",
      lg: "text-xl font-bold",
      xl: "text-2xl font-bold",
      "2xl": "text-3xl font-bold",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

const levelToSize: Record<HeadingLevel, VariantProps<typeof headingVariants>["size"]> = {
  1: "2xl",
  2: "xl",
  3: "lg",
  4: "md",
  5: "sm",
  6: "xs",
};

/**
 * Props for the Heading component.
 */
export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>, Omit<VariantProps<typeof headingVariants>, "size"> {
  /**
   * The heading level (1-6), which determines the HTML element (h1-h6).
   * @defaultValue 2
   */
  level?: HeadingLevel;
  /**
   * Visual size variant, independent of semantic level.
   * When not specified, matches the level.
   * @defaultValue undefined
   */
  size?: VariantProps<typeof headingVariants>["size"];
}

/**
 * Semantic heading component with flexible sizing.
 *
 * @remarks
 * Renders the appropriate h1-h6 element based on level.
 * Visual size can be controlled independently for design flexibility.
 *
 * @example
 * ```tsx
 * // Default h2 with matching size
 * <Heading>Section Title</Heading>
 *
 * // h1 for page title
 * <Heading level={1}>Page Title</Heading>
 *
 * // h2 with smaller visual appearance
 * <Heading level={2} size="md">Subsection</Heading>
 * ```
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, size, children, ...props }, ref) => {
    const Tag = `h${level}` as const;
    const visualSize = size ?? levelToSize[level];

    return (
      <Tag
        ref={ref as React.Ref<HTMLHeadingElement>}
        className={cn(headingVariants({ size: visualSize }), className)}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = "Heading";

export { headingVariants };
