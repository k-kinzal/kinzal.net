import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const tooltipVariants = cva(
  [
    "absolute z-50 px-2 py-1 text-sm rounded shadow-md",
    "bg-foreground text-foreground-inverse",
    "animate-in fade-in-0 zoom-in-95",
    "pointer-events-none",
  ],
  {
    variants: {
      placement: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      placement: "top",
    },
  }
);

/**
 * Props for the Tooltip component.
 */
export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content">, VariantProps<typeof tooltipVariants> {
  /** The content to display in the tooltip */
  content: ReactNode;
  /** The trigger element */
  children: ReactNode;
  /**
   * Delay in milliseconds before showing the tooltip.
   * @defaultValue 200
   */
  delay?: number;
  /**
   * Whether the tooltip is disabled.
   * @defaultValue false
   */
  disabled?: boolean;
}

/**
 * Tooltip component for displaying contextual information on hover/focus.
 *
 * @remarks
 * Shows a small popup with additional information when users hover over
 * or focus on an element. Ideal for icon buttons and truncated text.
 *
 * @example
 * ```tsx
 * // Basic tooltip
 * <Tooltip content="Delete item">
 *   <IconButton aria-label="Delete">
 *     <Icon icon={Trash} />
 *   </IconButton>
 * </Tooltip>
 *
 * // Different placements
 * <Tooltip content="Above" placement="top">...</Tooltip>
 * <Tooltip content="Below" placement="bottom">...</Tooltip>
 * <Tooltip content="Left" placement="left">...</Tooltip>
 * <Tooltip content="Right" placement="right">...</Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, children, placement, delay = 200, disabled = false, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const triggerRef = useRef<HTMLDivElement>(null);

    const showTooltip = useCallback(() => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }, [delay, disabled]);

    const hideTooltip = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
    }, []);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        {...props}
      >
        <div ref={triggerRef}>{children}</div>
        {isVisible && content && (
          <div role="tooltip" className={cn(tooltipVariants({ placement }), className)}>
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { tooltipVariants };
