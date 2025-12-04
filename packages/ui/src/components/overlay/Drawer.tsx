import {
  forwardRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const drawerOverlayVariants = cva([
  "fixed inset-0 z-50 bg-black/50",
  "animate-in fade-in-0",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
]);

const drawerContentVariants = cva(["fixed z-50 bg-background", "shadow-xl", "flex flex-col"], {
  variants: {
    side: {
      left: [
        "inset-y-0 left-0 h-full w-3/4 max-w-sm",
        "border-r border-border",
        "animate-in slide-in-from-left",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left",
      ],
      right: [
        "inset-y-0 right-0 h-full w-3/4 max-w-sm",
        "border-l border-border",
        "animate-in slide-in-from-right",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
      ],
      top: [
        "inset-x-0 top-0 w-full max-h-[80vh]",
        "border-b border-border",
        "animate-in slide-in-from-top",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top",
      ],
      bottom: [
        "inset-x-0 bottom-0 w-full max-h-[80vh]",
        "border-t border-border",
        "animate-in slide-in-from-bottom",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom",
      ],
    },
  },
  defaultVariants: {
    side: "right",
  },
});

/**
 * Props for the Drawer component.
 */
export interface DrawerProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof drawerContentVariants> {
  /** Whether the drawer is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** The drawer content */
  children: ReactNode;
  /**
   * Whether to show overlay behind the drawer.
   * @defaultValue true
   */
  overlay?: boolean;
  /**
   * Whether to close when clicking the overlay.
   * @defaultValue true
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether to close when pressing Escape.
   * @defaultValue true
   */
  closeOnEscape?: boolean;
  /**
   * Accessible label for the drawer.
   */
  "aria-label"?: string;
  /**
   * ID of element that labels the drawer.
   */
  "aria-labelledby"?: string;
}

/**
 * Drawer component for slide-in panels.
 *
 * @remarks
 * A panel that slides in from the edge of the screen.
 * Useful for navigation, filters, settings, or secondary content.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Button onClick={() => setOpen(true)}>Open Drawer</Button>
 *
 * <Drawer open={open} onOpenChange={setOpen} side="right">
 *   <DrawerHeader>
 *     <DrawerTitle>Settings</DrawerTitle>
 *   </DrawerHeader>
 *   <DrawerBody>
 *     <p>Drawer content goes here.</p>
 *   </DrawerBody>
 *   <DrawerFooter>
 *     <Button onClick={() => setOpen(false)}>Close</Button>
 *   </DrawerFooter>
 * </Drawer>
 * ```
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      className,
      side,
      open,
      onOpenChange,
      children,
      overlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      ...props
    },
    ref
  ) => {
    const close = useCallback(() => {
      onOpenChange(false);
    }, [onOpenChange]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === "Escape") {
          e.preventDefault();
          close();
        }
      },
      [closeOnEscape, close]
    );

    const handleOverlayClick = useCallback(() => {
      if (closeOnOverlayClick) {
        close();
      }
    }, [closeOnOverlayClick, close]);

    // Lock body scroll when open
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    // Focus trap could be added here for better accessibility

    if (!open) return null;

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        data-state={open ? "open" : "closed"}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {overlay && (
          <div
            className={cn(drawerOverlayVariants())}
            data-state={open ? "open" : "closed"}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
        )}
        <div
          className={cn(drawerContentVariants({ side }), className)}
          data-state={open ? "open" : "closed"}
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = "Drawer";

/**
 * Props for the DrawerHeader component.
 */
export type DrawerHeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * Header section of the drawer.
 */
export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between px-4 py-3",
          "border-border border-b",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerHeader.displayName = "DrawerHeader";

/**
 * Props for the DrawerTitle component.
 */
export type DrawerTitleProps = HTMLAttributes<HTMLHeadingElement>;

/**
 * Title within the drawer header.
 */
export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2 ref={ref} className={cn("text-foreground text-lg font-semibold", className)} {...props}>
        {children}
      </h2>
    );
  }
);

DrawerTitle.displayName = "DrawerTitle";

/**
 * Props for the DrawerBody component.
 */
export type DrawerBodyProps = HTMLAttributes<HTMLDivElement>;

/**
 * Main content area of the drawer.
 */
export const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex-1 overflow-y-auto p-4", className)} {...props}>
        {children}
      </div>
    );
  }
);

DrawerBody.displayName = "DrawerBody";

/**
 * Props for the DrawerFooter component.
 */
export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Footer section of the drawer.
 */
export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2 px-4 py-3", "border-border border-t", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DrawerFooter.displayName = "DrawerFooter";

/**
 * Props for the DrawerClose component.
 */
export interface DrawerCloseProps extends HTMLAttributes<HTMLButtonElement> {
  /** Accessible label for the close button */
  "aria-label"?: string;
}

/**
 * Close button for the drawer.
 */
export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ className, "aria-label": ariaLabel = "Close drawer", onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        className={cn("hover:bg-background-muted rounded p-1", "text-foreground-muted", className)}
        onClick={onClick}
        {...props}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );
  }
);

DrawerClose.displayName = "DrawerClose";

export { drawerOverlayVariants, drawerContentVariants };
