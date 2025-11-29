import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const popoverVariants = cva(
  [
    "absolute z-50 min-w-[8rem] rounded-md shadow-lg",
    "bg-background border border-border",
    "animate-in fade-in-0 zoom-in-95",
  ],
  {
    variants: {
      placement: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        "top-start": "bottom-full left-0 mb-2",
        "top-end": "bottom-full right-0 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        "bottom-start": "top-full left-0 mt-2",
        "bottom-end": "top-full right-0 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      placement: "bottom-start",
    },
  }
);

/**
 * Props for the Popover component.
 */
export interface PopoverProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof popoverVariants> {
  /** The content to display in the popover */
  content: ReactNode;
  /** The trigger element */
  children: ReactNode;
  /**
   * Whether the popover is open (controlled mode).
   */
  open?: boolean;
  /**
   * Callback when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Whether to close on click outside.
   * @defaultValue true
   */
  closeOnClickOutside?: boolean;
  /**
   * Whether to close on Escape key.
   * @defaultValue true
   */
  closeOnEscape?: boolean;
  /**
   * Accessible label for the popover.
   */
  "aria-label"?: string;
}

/**
 * Popover component for displaying rich content in a floating panel.
 *
 * @remarks
 * Displays content in a floating panel triggered by click.
 * Unlike Tooltip, Popover can contain interactive elements.
 *
 * @example
 * ```tsx
 * // Basic popover
 * <Popover content={<div className="p-4">Popover content</div>}>
 *   <Button>Open popover</Button>
 * </Popover>
 *
 * // Controlled popover
 * const [open, setOpen] = useState(false);
 * <Popover
 *   content={<div>Content</div>}
 *   open={open}
 *   onOpenChange={setOpen}
 * >
 *   <Button>Toggle</Button>
 * </Popover>
 *
 * // Different placements
 * <Popover content={...} placement="bottom-end">...</Popover>
 * ```
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      className,
      content,
      children,
      placement,
      open: controlledOpen,
      onOpenChange,
      closeOnClickOutside = true,
      closeOnEscape = true,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (open: boolean) => {
        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
      },
      [isControlled, onOpenChange]
    );

    const toggle = useCallback(() => {
      setOpen(!isOpen);
    }, [isOpen, setOpen]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === "Escape" && isOpen) {
          e.preventDefault();
          setOpen(false);
        }
      },
      [closeOnEscape, isOpen, setOpen]
    );

    useEffect(() => {
      if (!closeOnClickOutside || !isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeOnClickOutside, isOpen, setOpen]);

    const ariaLabel = props["aria-label"];

    return (
      <div
        ref={containerRef}
        className="relative inline-block"
        onKeyDown={handleKeyDown}
      >
        <div
          ref={ref}
          onClick={toggle}
          {...props}
        >
          {children}
        </div>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="false"
            aria-label={ariaLabel}
            className={cn(popoverVariants({ placement }), className)}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Popover.displayName = "Popover";

export { popoverVariants };
