import {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const toastVariants = cva(
  [
    "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg",
    "bg-background border border-border",
    "animate-in slide-in-from-right-full fade-in-0",
    "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=closed]:fade-out-0",
  ],
  {
    variants: {
      variant: {
        default: "",
        success: "border-l-4 border-l-green-500",
        warning: "border-l-4 border-l-yellow-500",
        error: "border-l-4 border-l-red-500",
        info: "border-l-4 border-l-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Toast item data structure.
 */
export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  duration?: number;
  action?: ReactNode;
}

/**
 * Props for the Toast component.
 */
export interface ToastProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  /** Toast title */
  title?: string | undefined;
  /** Toast description */
  description?: string | undefined;
  /** Optional action button */
  action?: ReactNode;
  /** Callback when toast is dismissed */
  onDismiss?: () => void;
  /** Whether the toast is open */
  open?: boolean;
}

/**
 * Individual toast notification.
 *
 * @example
 * ```tsx
 * <Toast
 *   title="Success"
 *   description="Your changes have been saved."
 *   variant="success"
 * />
 * ```
 */
export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      title,
      description,
      action,
      onDismiss,
      open = true,
      ...props
    },
    ref
  ) => {
    if (!open) return null;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        data-state={open ? "open" : "closed"}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-medium text-foreground">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm text-foreground-muted">
              {description}
            </div>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 p-1 rounded hover:bg-background-muted"
            aria-label="Dismiss"
          >
            <svg
              className="w-4 h-4 text-foreground-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";

// Toast Context for global toast management
interface ToastContextType {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Props for the ToastProvider component.
 */
export interface ToastProviderProps {
  children: ReactNode;
  /**
   * Maximum number of toasts to show at once.
   * @defaultValue 5
   */
  maxToasts?: number;
  /**
   * Default duration in milliseconds.
   * @defaultValue 5000
   */
  defaultDuration?: number;
}

/**
 * Provider for global toast management.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 *   <ToastContainer />
 * </ToastProvider>
 * ```
 */
export function ToastProvider({
  children,
  maxToasts = 5,
  defaultDuration = 5000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastData = {
        ...toast,
        id,
        duration: toast.duration ?? defaultDuration,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-maxToasts);
      });

      return id;
    },
    [defaultDuration, maxToasts]
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = "ToastProvider";

/**
 * Hook to access toast functions.
 *
 * @example
 * ```tsx
 * const { addToast } = useToast();
 *
 * const handleSave = () => {
 *   addToast({
 *     title: "Saved",
 *     description: "Your changes have been saved.",
 *     variant: "success",
 *   });
 * };
 * ```
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const toastContainerVariants = cva(
  "fixed z-50 flex flex-col gap-2 p-4 pointer-events-none max-h-screen overflow-hidden",
  {
    variants: {
      position: {
        "top-left": "top-0 left-0",
        "top-center": "top-0 left-1/2 -translate-x-1/2",
        "top-right": "top-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-0 right-0",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  }
);

/**
 * Props for the ToastContainer component.
 */
export interface ToastContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastContainerVariants> {}

/**
 * Container for rendering toasts.
 *
 * @example
 * ```tsx
 * <ToastProvider>
 *   <App />
 *   <ToastContainer position="top-right" />
 * </ToastProvider>
 * ```
 */
export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps>(
  ({ className, position, ...props }, ref) => {
    const { toasts, removeToast } = useToast();

    return (
      <div
        ref={ref}
        className={cn(toastContainerVariants({ position }), className)}
        {...props}
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    );
  }
);

ToastContainer.displayName = "ToastContainer";

interface ToastItemProps {
  toast: ToastData;
  onDismiss: () => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(onDismiss, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onDismiss]);

  return (
    <Toast
      className="pointer-events-auto w-80"
      variant={toast.variant}
      title={toast.title}
      description={toast.description}
      action={toast.action}
      onDismiss={onDismiss}
    />
  );
}

export { toastVariants, toastContainerVariants };
