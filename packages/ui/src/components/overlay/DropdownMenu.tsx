import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
  type ButtonHTMLAttributes,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const dropdownMenuVariants = cva(
  [
    "absolute z-50 min-w-[8rem] rounded-md shadow-lg py-1",
    "bg-background border border-border",
    "animate-in fade-in-0 zoom-in-95",
  ],
  {
    variants: {
      placement: {
        "bottom-start": "top-full left-0 mt-1",
        "bottom-end": "top-full right-0 mt-1",
        "top-start": "bottom-full left-0 mb-1",
        "top-end": "bottom-full right-0 mb-1",
      },
    },
    defaultVariants: {
      placement: "bottom-start",
    },
  }
);

// Context for menu state
interface DropdownMenuContextType {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  close: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  registerItem: (ref: HTMLButtonElement | null, index: number) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(
  undefined
);

/**
 * Props for the DropdownMenu component.
 */
export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** The trigger and content elements */
  children: ReactNode;
  /**
   * Whether the menu is open (controlled mode).
   */
  open?: boolean;
  /**
   * Callback when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
}

/**
 * DropdownMenu component for displaying a list of actions.
 *
 * @remarks
 * A menu component that displays a list of actions or options.
 * Supports full keyboard navigation (arrow keys, Home, End, Enter, Escape).
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>
 *     <Button>Options</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem onClick={() => console.log('Edit')}>
 *       Edit
 *     </DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem destructive onClick={() => console.log('Delete')}>
 *       Delete
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ className, children, open: controlledOpen, onOpenChange, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<Map<number, HTMLButtonElement>>(new Map());

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (open: boolean) => {
        if (!isControlled) {
          setInternalOpen(open);
        }
        onOpenChange?.(open);
        if (!open) {
          setActiveIndex(-1);
        }
      },
      [isControlled, onOpenChange]
    );

    const close = useCallback(() => {
      setOpen(false);
    }, [setOpen]);

    const registerItem = useCallback(
      (element: HTMLButtonElement | null, index: number) => {
        if (element) {
          itemsRef.current.set(index, element);
        } else {
          itemsRef.current.delete(index);
        }
      },
      []
    );

    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          close();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, close]);

    return (
      <DropdownMenuContext.Provider
        value={{ isOpen, setOpen, close, activeIndex, setActiveIndex, registerItem }}
      >
        <div
          ref={(node) => {
            containerRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={cn("relative inline-block", className)}
          {...props}
        >
          {children}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);

DropdownMenu.displayName = "DropdownMenu";

/**
 * Props for the DropdownMenuTrigger component.
 */
export interface DropdownMenuTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Children to render inside the trigger button */
  children: ReactNode;
}

/**
 * Trigger button for the dropdown menu.
 */
export const DropdownMenuTrigger = forwardRef<
  HTMLButtonElement,
  DropdownMenuTriggerProps
>(({ children, onClick, onKeyDown, className, ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
  }

  const { isOpen, setOpen } = context;

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="menu"
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        } else if (e.key === "ArrowDown" && !isOpen) {
          e.preventDefault();
          setOpen(true);
        }
        onKeyDown?.(e);
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
});

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/**
 * Props for the DropdownMenuContent component.
 */
export interface DropdownMenuContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownMenuVariants> {}

/**
 * Content container for dropdown menu items.
 */
export const DropdownMenuContent = forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, children, placement, onKeyDown, ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuContent must be used within DropdownMenu");
  }

  const { isOpen, close, activeIndex, setActiveIndex } = context;
  const menuRef = useRef<HTMLDivElement>(null);

  const collectItems = useCallback(() => {
    if (!menuRef.current) return [];
    return Array.from(
      menuRef.current.querySelectorAll('[role="menuitem"]:not([disabled])')
    ) as HTMLButtonElement[];
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const items = collectItems();
      const count = items.length;

      if (count === 0) return;

      let newIndex = activeIndex;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          newIndex = activeIndex < count - 1 ? activeIndex + 1 : 0;
          break;
        case "ArrowUp":
          e.preventDefault();
          newIndex = activeIndex > 0 ? activeIndex - 1 : count - 1;
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = count - 1;
          break;
        case "Escape":
          e.preventDefault();
          close();
          return;
        case "Enter":
        case " ":
          if (activeIndex >= 0 && activeIndex < count) {
            e.preventDefault();
            items[activeIndex]?.click();
          }
          return;
        default:
          onKeyDown?.(e);
          return;
      }

      setActiveIndex(newIndex);
      items[newIndex]?.focus();
      onKeyDown?.(e);
    },
    [activeIndex, setActiveIndex, close, collectItems, onKeyDown]
  );

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={(node) => {
        menuRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      role="menu"
      tabIndex={-1}
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
      className={cn(dropdownMenuVariants({ placement }), className)}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownMenuContent.displayName = "DropdownMenuContent";

/**
 * Props for the DropdownMenuItem component.
 */
export interface DropdownMenuItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Whether the item is destructive (e.g., delete action).
   * @defaultValue false
   */
  destructive?: boolean;
}

/**
 * Individual menu item within the dropdown.
 */
export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(({ className, destructive = false, onClick, children, disabled, ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenuItem must be used within DropdownMenu");
  }

  const { close } = context;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(e);
        close();
      }
    },
    [disabled, onClick, close]
  );

  return (
    <button
      ref={ref}
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "w-full px-3 py-2 text-sm text-left",
        "focus:outline-none focus:bg-background-muted",
        "hover:bg-background-muted",
        "disabled:opacity-50 disabled:pointer-events-none",
        destructive ? "text-status-error-text" : "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";

/**
 * Props for the DropdownMenuSeparator component.
 */
export type DropdownMenuSeparatorProps = HTMLAttributes<HTMLDivElement>;

/**
 * Visual separator between menu items.
 */
export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="separator"
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
});

DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/**
 * Props for the DropdownMenuLabel component.
 */
export type DropdownMenuLabelProps = HTMLAttributes<HTMLDivElement>;

/**
 * Label/header for a group of menu items.
 */
export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "px-3 py-1.5 text-xs font-semibold text-foreground-muted",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export { dropdownMenuVariants };
