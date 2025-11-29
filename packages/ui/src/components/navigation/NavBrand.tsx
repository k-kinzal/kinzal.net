import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the NavBrand component.
 */
export type NavBrandProps = AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Brand/logo link component.
 *
 * @remarks
 * A simple anchor element for displaying site logo or brand name.
 * All styling (borders, fonts, spacing) is controlled via className.
 *
 * @example
 * ```tsx
 * // Basic brand link
 * <NavBrand href="/" className="text-xl font-bold px-4">
 *   Site Name
 * </NavBrand>
 *
 * // With custom border accent
 * <NavBrand href="/" className="border-l-4 border-l-primary pl-4 font-brand">
 *   Brand
 * </NavBrand>
 * ```
 */
export const NavBrand = forwardRef<HTMLAnchorElement, NavBrandProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          "inline-flex items-center",
          "text-foreground",
          "transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

NavBrand.displayName = "NavBrand";
