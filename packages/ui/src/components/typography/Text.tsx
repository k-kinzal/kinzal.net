import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the Text component.
 */
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Text size variant.
   * @defaultValue "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Text color variant.
   * @defaultValue "default"
   */
  variant?: "default" | "muted" | "inherit";
  /**
   * Render as span instead of paragraph.
   * @defaultValue false
   */
  as?: "p" | "span";
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const variantClasses = {
  default: "text-foreground",
  muted: "text-foreground-muted",
  inherit: "",
};

/**
 * Text component for body content.
 *
 * @remarks
 * A flexible text component for paragraphs and inline text.
 * Supports size and color variants.
 *
 * @example
 * ```tsx
 * // Default paragraph
 * <Text>This is body text.</Text>
 *
 * // Muted secondary text
 * <Text variant="muted" size="sm">Secondary information</Text>
 *
 * // Inline span
 * <Text as="span" size="lg">Inline text</Text>
 * ```
 */
export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, size = "md", variant = "default", as = "p", children, ...props },
    ref
  ) => {
    const Tag = as;

    return (
      <Tag
        ref={ref}
        className={cn(
          sizeClasses[size],
          variantClasses[variant],
          "leading-relaxed",
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Text.displayName = "Text";
