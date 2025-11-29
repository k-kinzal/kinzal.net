import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the Footer component.
 */
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /**
   * Position of the footer.
   * - `fixed`: Fixed to the bottom of the viewport
   * - `sticky`: Sticky positioning (sticks when scrolling)
   * - `static`: Normal document flow
   * @defaultValue "static"
   */
  position?: "fixed" | "sticky" | "static";
}

/**
 * Page footer component.
 *
 * @remarks
 * A flexible footer component for page bottom content.
 * Height and internal layout are controlled by children and className.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Footer className="h-12 px-4">
 *   <span>© 2024 Company</span>
 * </Footer>
 *
 * // Fixed footer
 * <Footer position="fixed" className="h-16 px-6">
 *   <nav className="flex gap-4">
 *     <a href="/privacy">Privacy</a>
 *     <a href="/terms">Terms</a>
 *   </nav>
 * </Footer>
 * ```
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, position = "static", children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          "w-full",
          "bg-background",
          "transition-colors",
          {
            "fixed bottom-0 left-0 z-50": position === "fixed",
            "sticky bottom-0 z-50": position === "sticky",
          },
          className
        )}
        {...props}
      >
        {children}
      </footer>
    );
  }
);

Footer.displayName = "Footer";
