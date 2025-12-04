import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the Container component.
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * When true, removes max-width constraint for full-width layout.
   * @default false
   */
  fluid?: boolean;
}

/**
 * Centered content wrapper with max-width.
 *
 * @remarks
 * Container centers content horizontally and applies a maximum width
 * for optimal reading experience. Use fluid prop for full-width layouts.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 * <Container fluid>Full width content</Container>
 * ```
 */

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4",
          {
            "max-w-7xl": !fluid,
          },
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
