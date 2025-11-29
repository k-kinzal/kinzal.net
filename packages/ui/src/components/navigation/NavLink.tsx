import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the NavLink component.
 */
export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * When true, indicates the current page with visual styling
   * and aria-current="page" attribute.
   * @defaultValue false
   */
  active?: boolean;
}

/**
 * Navigation link with active state support.
 *
 * @remarks
 * A styled anchor element for navigation with active state.
 * Includes aria-current for accessibility when active.
 * Width, height, and specific styling are controlled via className.
 *
 * @example
 * ```tsx
 * // Basic navigation
 * <nav className="flex gap-4">
 *   <NavLink href="/" active>Home</NavLink>
 *   <NavLink href="/about">About</NavLink>
 * </nav>
 *
 * // With custom styling
 * <NavLink href="/" className="px-6 py-2" active>
 *   Home
 * </NavLink>
 * ```
 */
export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        aria-current={active ? "page" : undefined}
        className={cn(
          "inline-flex items-center justify-center",
          "transition-colors",
          {
            "text-foreground-muted hover:text-foreground hover:bg-background-muted": !active,
            "text-foreground bg-background-muted": active,
          },
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavLink.displayName = "NavLink";
