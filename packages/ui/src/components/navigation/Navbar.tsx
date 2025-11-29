import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the Navbar component.
 */
export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Position of the navbar.
   * - `fixed`: Fixed to the top of the viewport
   * - `sticky`: Sticky positioning (sticks when scrolling)
   * - `static`: Normal document flow
   * @defaultValue "static"
   */
  position?: "fixed" | "sticky" | "static";
}

/**
 * Top navigation header component.
 *
 * @remarks
 * A flexible header component for site navigation.
 * Height and internal layout are controlled by children and className.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Navbar className="h-16">
 *   <a href="/">Brand</a>
 *   <nav className="flex gap-4">
 *     <a href="/about">About</a>
 *   </nav>
 * </Navbar>
 *
 * // Fixed navbar
 * <Navbar position="fixed" className="h-20 px-4">
 *   <Brand />
 *   <Navigation />
 * </Navbar>
 * ```
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ className, position = "static", children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "w-full",
          "bg-background",
          "transition-colors",
          {
            "fixed top-0 left-0 z-50": position === "fixed",
            "sticky top-0 z-50": position === "sticky",
          },
          className
        )}
        {...props}
      >
        {children}
      </header>
    );
  }
);

Navbar.displayName = "Navbar";
