import {
  forwardRef,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
  useRef,
} from "react";
import { cn } from "@/utils/cn";

/**
 * Props for the PaginationItem component.
 */
export interface PaginationItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * When true, indicates the current page.
   * @defaultValue false
   */
  active?: boolean;
}

/**
 * Props for the Pagination component.
 */
export type PaginationProps = HTMLAttributes<HTMLElement>;

/**
 * Individual pagination button.
 *
 * @example
 * ```tsx
 * <PaginationItem>1</PaginationItem>
 * <PaginationItem active>2</PaginationItem>
 * <PaginationItem>3</PaginationItem>
 * ```
 */
export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, active = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-current={active ? "page" : undefined}
        disabled={disabled}
        className={cn(
          "min-w-[2.5rem] h-10 px-3",
          "inline-flex items-center justify-center",
          "text-sm font-medium rounded-md",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          {
            "text-foreground-muted hover:text-foreground hover:bg-background-muted":
              !active && !disabled,
            "text-foreground-inverse bg-primary": active,
            "text-foreground-muted/50 cursor-not-allowed": disabled,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PaginationItem.displayName = "PaginationItem";

/**
 * Pagination ellipsis indicator.
 *
 * @example
 * ```tsx
 * <PaginationItem>1</PaginationItem>
 * <PaginationEllipsis />
 * <PaginationItem>10</PaginationItem>
 * ```
 */
export const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "min-w-[2.5rem] h-10 px-3",
        "inline-flex items-center justify-center",
        "text-foreground-muted",
        className
      )}
      {...props}
    >
      ...
    </span>
  );
});

PaginationEllipsis.displayName = "PaginationEllipsis";

/**
 * Pagination navigation component with keyboard support.
 *
 * @remarks
 * A container for pagination items with proper accessibility.
 * Supports keyboard navigation:
 * - Arrow Left/Right: Move focus to previous/next page button
 * - Home: Move focus to first page button
 * - End: Move focus to last page button
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationItem disabled>Previous</PaginationItem>
 *   <PaginationItem active>1</PaginationItem>
 *   <PaginationItem>2</PaginationItem>
 *   <PaginationItem>3</PaginationItem>
 *   <PaginationEllipsis />
 *   <PaginationItem>10</PaginationItem>
 *   <PaginationItem>Next</PaginationItem>
 * </Pagination>
 * ```
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, children, onKeyDown, ...props }, ref) => {
    const itemsRef = useRef<HTMLButtonElement[]>([]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLElement>) => {
        const items = itemsRef.current.filter(Boolean);
        const currentIndex = items.findIndex((item) => item === document.activeElement);

        let nextIndex: number | null = null;

        switch (e.key) {
          case "ArrowRight":
            e.preventDefault();
            nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            break;
          case "ArrowLeft":
            e.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            break;
          case "Home":
            e.preventDefault();
            nextIndex = 0;
            break;
          case "End":
            e.preventDefault();
            nextIndex = items.length - 1;
            break;
        }

        if (nextIndex !== null) {
          const item = items[nextIndex];
          if (item) {
            item.focus();
          }
        }

        onKeyDown?.(e);
      },
      [onKeyDown]
    );

    let itemIndex = 0;
    const enhancedChildren = Children.map(children, (child) => {
      if (isValidElement<PaginationItemProps>(child) && child.type === PaginationItem) {
        const currentIndex = itemIndex++;
        return cloneElement(child, {
          ref: (el: HTMLButtonElement) => {
            itemsRef.current[currentIndex] = el;
          },
        } as Partial<PaginationItemProps>);
      }
      return child;
    });

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        onKeyDown={handleKeyDown}
        className={cn("flex items-center gap-1", className)}
        {...props}
      >
        {enhancedChildren}
      </nav>
    );
  }
);

Pagination.displayName = "Pagination";
