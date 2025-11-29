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
 * Props for the TabItem component.
 */
export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * When true, indicates the active tab.
   * @defaultValue false
   */
  active?: boolean;
}

/**
 * Props for the TabList component.
 */
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the tab list.
   * @defaultValue "default"
   */
  variant?: "default" | "pills";
}

/**
 * Individual tab button.
 *
 * @remarks
 * Supports keyboard navigation when used inside TabList.
 * - Arrow Left/Right: Move to previous/next tab
 * - Home: Move to first tab
 * - End: Move to last tab
 *
 * @example
 * ```tsx
 * <TabItem active>Tab 1</TabItem>
 * <TabItem>Tab 2</TabItem>
 * ```
 */
export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        className={cn(
          "px-4 py-2",
          "text-sm font-medium",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          {
            "text-foreground-muted hover:text-foreground": !active,
            "text-foreground border-b-2 border-primary": active,
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

TabItem.displayName = "TabItem";

/**
 * Props for the TabPillItem component.
 */
export interface TabPillItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * When true, indicates the active tab.
   * @defaultValue false
   */
  active?: boolean;
}

/**
 * Individual pill-style tab button.
 *
 * @remarks
 * Supports keyboard navigation when used inside TabList.
 * - Arrow Left/Right: Move to previous/next tab
 * - Home: Move to first tab
 * - End: Move to last tab
 *
 * @example
 * ```tsx
 * <TabPillItem active>Tab 1</TabPillItem>
 * <TabPillItem>Tab 2</TabPillItem>
 * ```
 */
export const TabPillItem = forwardRef<HTMLButtonElement, TabPillItemProps>(
  ({ className, active = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        className={cn(
          "px-4 py-2 rounded-full",
          "text-sm font-medium",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          {
            "text-foreground-muted hover:text-foreground hover:bg-background-muted": !active,
            "text-foreground-inverse bg-primary": active,
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

TabPillItem.displayName = "TabPillItem";

/**
 * Tab list container with keyboard navigation support.
 *
 * @remarks
 * A container for tab items with proper accessibility.
 * Supports keyboard navigation:
 * - Arrow Left/Right: Move focus to previous/next tab
 * - Home: Move focus to first tab
 * - End: Move focus to last tab
 *
 * @example
 * ```tsx
 * // Default underline style
 * <TabList>
 *   <TabItem active>Tab 1</TabItem>
 *   <TabItem>Tab 2</TabItem>
 *   <TabItem>Tab 3</TabItem>
 * </TabList>
 *
 * // Pill style
 * <TabList variant="pills">
 *   <TabPillItem active>Tab 1</TabPillItem>
 *   <TabPillItem>Tab 2</TabPillItem>
 * </TabList>
 * ```
 */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, variant = "default", children, onKeyDown, ...props }, ref) => {
    const tabsRef = useRef<HTMLButtonElement[]>([]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const tabs = tabsRef.current.filter(Boolean);
        const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);

        let nextIndex: number | null = null;

        switch (e.key) {
          case "ArrowRight":
            e.preventDefault();
            nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            break;
          case "ArrowLeft":
            e.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            break;
          case "Home":
            e.preventDefault();
            nextIndex = 0;
            break;
          case "End":
            e.preventDefault();
            nextIndex = tabs.length - 1;
            break;
        }

        if (nextIndex !== null) {
          const tab = tabs[nextIndex];
          if (tab) {
            tab.focus();
          }
        }

        onKeyDown?.(e);
      },
      [onKeyDown]
    );

    // Clone children to inject refs
    const enhancedChildren = Children.map(children, (child, index) => {
      if (isValidElement<TabItemProps>(child)) {
        return cloneElement(child, {
          ref: (el: HTMLButtonElement) => {
            tabsRef.current[index] = el;
          },
        } as Partial<TabItemProps>);
      }
      return child;
    });

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          "flex",
          {
            "border-b border-border": variant === "default",
            "gap-2": variant === "pills",
          },
          className
        )}
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

TabList.displayName = "TabList";
