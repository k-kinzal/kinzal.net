import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    __DISABLE_LAZY_LOADING__?: boolean;
  }
}

/**
 * Options for useIntersectionObserver hook.
 */
interface UseIntersectionObserverOptions {
  /** Root margin for intersection detection */
  rootMargin?: string;
  /** Threshold for intersection detection */
  threshold?: number | number[];
  /** Whether to disconnect after first intersection */
  triggerOnce?: boolean;
}

/**
 * Result of useIntersectionObserver hook.
 */
interface UseIntersectionObserverResult<T extends HTMLElement> {
  /** Ref to attach to the observed element */
  ref: React.RefObject<T | null>;
  /** Whether the element is currently intersecting */
  isIntersecting: boolean;
  /** Manually reset intersection state */
  reset: () => void;
}

/**
 * Hook for observing element intersection with viewport.
 *
 * @remarks
 * Uses IntersectionObserver API to detect when an element enters the viewport.
 * Useful for lazy loading, infinite scroll, and visibility-based animations.
 *
 * @param options - Observer options
 * @returns Object with ref, intersection state, and reset function
 *
 * @example
 * ```tsx
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   rootMargin: "200px",
 *   triggerOnce: true,
 * });
 *
 * return (
 *   <div ref={ref}>
 *     {isIntersecting && <ExpensiveComponent />}
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px",
  threshold = 0,
  triggerOnce = false,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverResult<T> {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const reset = useCallback(() => {
    setIsIntersecting(false);
  }, []);

  useEffect(() => {
    // If lazy loading is disabled (test mode), immediately set intersecting
    if (typeof window !== "undefined" && window.__DISABLE_LAZY_LOADING__ === true) {
      setIsIntersecting(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already intersected, don't re-observe
    if (triggerOnce && isIntersecting) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);

          // Disconnect after first intersection if triggerOnce
          if (triggerOnce && entry.isIntersecting) {
            observer.disconnect();
          }
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce, isIntersecting]);

  // Return true immediately if lazy loading is disabled for testing
  const effectiveIsIntersecting =
    typeof window !== "undefined" && window.__DISABLE_LAZY_LOADING__ === true
      ? true
      : isIntersecting;

  return { ref, isIntersecting: effectiveIsIntersecting, reset };
}
