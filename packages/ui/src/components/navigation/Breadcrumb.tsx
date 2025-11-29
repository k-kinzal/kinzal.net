import {
  forwardRef,
  type HTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the BreadcrumbItem component.
 */
export interface BreadcrumbItemProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * When true, renders as text instead of link (for current page).
   * @defaultValue false
   */
  current?: boolean;
}

/**
 * Props for the Breadcrumb component.
 */
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /**
   * Custom separator between items.
   * @defaultValue "/"
   */
  separator?: ReactNode;
}

/**
 * Individual breadcrumb item.
 *
 * @example
 * ```tsx
 * <BreadcrumbItem href="/">Home</BreadcrumbItem>
 * <BreadcrumbItem current>Current Page</BreadcrumbItem>
 * ```
 */
export const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, current = false, children, ...props }, ref) => {
    if (current) {
      return (
        <span
          className={cn(
            "text-foreground",
            "font-medium",
            className
          )}
          aria-current="page"
        >
          {children}
        </span>
      );
    }

    return (
      <a
        ref={ref}
        className={cn(
          "text-foreground-muted",
          "hover:text-foreground",
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

BreadcrumbItem.displayName = "BreadcrumbItem";

/**
 * Breadcrumb navigation component.
 *
 * @remarks
 * Displays a hierarchical navigation path.
 * Includes proper accessibility with nav and aria-label.
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/gallery">Gallery</BreadcrumbItem>
 *   <BreadcrumbItem current>Artwork</BreadcrumbItem>
 * </Breadcrumb>
 *
 * // With custom separator
 * <Breadcrumb separator=">">
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem current>Page</BreadcrumbItem>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, separator = "/", children, ...props }, ref) => {
    const items = Array.isArray(children) ? children : [children];

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("text-sm", className)}
        {...props}
      >
        <ol className="flex items-center gap-2">
          {items.map((child, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span
                  className="text-foreground-muted"
                  aria-hidden="true"
                >
                  {separator}
                </span>
              )}
              {child}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
