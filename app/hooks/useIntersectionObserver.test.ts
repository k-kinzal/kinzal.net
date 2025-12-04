import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIntersectionObserver } from "./useIntersectionObserver";

// Store callbacks for each observer instance
const observerCallbacks = new Map<MockIntersectionObserver, IntersectionObserverCallback>();
const observedElements = new Map<Element, MockIntersectionObserver>();

const mockObserve = vi.fn((element: Element) => {
  // Track which observer is observing which element
});
const mockDisconnect = vi.fn();
const mockUnobserve = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {
    this.callback = callback;
    observerCallbacks.set(this, callback);
  }

  observe(element: Element) {
    mockObserve(element);
    observedElements.set(element, this);
  }

  disconnect() {
    mockDisconnect();
  }

  unobserve(element: Element) {
    mockUnobserve(element);
    observedElements.delete(element);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  // Helper to trigger callback
  triggerIntersection(isIntersecting: boolean) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this);
  }
}

// Helper to get the observer for an element and trigger intersection
function triggerElementIntersection(element: Element, isIntersecting: boolean) {
  const observer = observedElements.get(element);
  if (observer) {
    const callback = observerCallbacks.get(observer);
    if (callback) {
      callback([{ isIntersecting } as IntersectionObserverEntry], observer);
    }
  }
}

describe("useIntersectionObserver", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    mockObserve.mockClear();
    mockDisconnect.mockClear();
    mockUnobserve.mockClear();
    observerCallbacks.clear();
    observedElements.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns ref, isIntersecting false initially, and reset function", () => {
    const { result } = renderHook(() => useIntersectionObserver());

    expect(result.current.ref).toBeDefined();
    expect(result.current.isIntersecting).toBe(false);
    expect(typeof result.current.reset).toBe("function");
  });

  it("observes element when ref is attached", () => {
    const element = document.createElement("div");

    // Create a wrapper that sets the ref immediately so useEffect can observe it
    const { result } = renderHook(() => {
      const hookResult = useIntersectionObserver<HTMLDivElement>();
      if (!hookResult.ref.current) {
        (hookResult.ref as { current: HTMLDivElement | null }).current = element;
      }
      return hookResult;
    });

    // The effect should have run and observed the element
    expect(mockObserve).toHaveBeenCalledWith(element);
  });

  it("updates isIntersecting when element enters viewport", () => {
    const element = document.createElement("div");

    // Create a wrapper that sets the ref immediately
    const { result } = renderHook(() => {
      const hookResult = useIntersectionObserver<HTMLDivElement>();
      // Set ref immediately (before useEffect runs on next cycle)
      if (!hookResult.ref.current) {
        (hookResult.ref as { current: HTMLDivElement | null }).current = element;
      }
      return hookResult;
    });

    // Wait for effect to run
    expect(result.current.isIntersecting).toBe(false);

    // Trigger intersection
    act(() => {
      triggerElementIntersection(element, true);
    });

    expect(result.current.isIntersecting).toBe(true);
  });

  it("updates isIntersecting when element leaves viewport", () => {
    const element = document.createElement("div");

    const { result } = renderHook(() => {
      const hookResult = useIntersectionObserver<HTMLDivElement>();
      if (!hookResult.ref.current) {
        (hookResult.ref as { current: HTMLDivElement | null }).current = element;
      }
      return hookResult;
    });

    // Simulate entering
    act(() => {
      triggerElementIntersection(element, true);
    });

    expect(result.current.isIntersecting).toBe(true);

    // Simulate leaving
    act(() => {
      triggerElementIntersection(element, false);
    });

    expect(result.current.isIntersecting).toBe(false);
  });

  it("disconnects observer on unmount", () => {
    const element = document.createElement("div");

    const { unmount } = renderHook(() => {
      const hookResult = useIntersectionObserver<HTMLDivElement>();
      if (!hookResult.ref.current) {
        (hookResult.ref as { current: HTMLDivElement | null }).current = element;
      }
      return hookResult;
    });

    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("reset function sets isIntersecting to false", () => {
    const element = document.createElement("div");

    const { result } = renderHook(() => {
      const hookResult = useIntersectionObserver<HTMLDivElement>();
      if (!hookResult.ref.current) {
        (hookResult.ref as { current: HTMLDivElement | null }).current = element;
      }
      return hookResult;
    });

    // Set to true
    act(() => {
      triggerElementIntersection(element, true);
    });

    expect(result.current.isIntersecting).toBe(true);

    // Reset
    act(() => {
      result.current.reset();
    });

    expect(result.current.isIntersecting).toBe(false);
  });

  describe("triggerOnce option", () => {
    it("disconnects after first intersection when triggerOnce is true", () => {
      const element = document.createElement("div");

      renderHook(() => {
        const hookResult = useIntersectionObserver<HTMLDivElement>({ triggerOnce: true });
        if (!hookResult.ref.current) {
          (hookResult.ref as { current: HTMLDivElement | null }).current = element;
        }
        return hookResult;
      });

      // Simulate intersection
      act(() => {
        triggerElementIntersection(element, true);
      });

      // Should disconnect after intersection
      expect(mockDisconnect).toHaveBeenCalled();
    });

    it("continues observing when triggerOnce is false", () => {
      const element = document.createElement("div");

      const { result } = renderHook(() => {
        const hookResult = useIntersectionObserver<HTMLDivElement>({ triggerOnce: false });
        if (!hookResult.ref.current) {
          (hookResult.ref as { current: HTMLDivElement | null }).current = element;
        }
        return hookResult;
      });

      // Simulate intersection - entering viewport
      act(() => {
        triggerElementIntersection(element, true);
      });

      expect(result.current.isIntersecting).toBe(true);

      // Simulate leaving viewport
      act(() => {
        triggerElementIntersection(element, false);
      });

      expect(result.current.isIntersecting).toBe(false);

      // Simulate re-entering viewport - should still work (not disconnected)
      act(() => {
        triggerElementIntersection(element, true);
      });

      expect(result.current.isIntersecting).toBe(true);
    });
  });

  describe("options", () => {
    it("uses default options", () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current.isIntersecting).toBe(false);
    });

    it("accepts custom rootMargin", () => {
      const { result } = renderHook(() => useIntersectionObserver({ rootMargin: "100px" }));

      expect(result.current.isIntersecting).toBe(false);
    });

    it("accepts custom threshold", () => {
      const { result } = renderHook(() => useIntersectionObserver({ threshold: 0.5 }));

      expect(result.current.isIntersecting).toBe(false);
    });

    it("accepts array threshold", () => {
      const { result } = renderHook(() => useIntersectionObserver({ threshold: [0, 0.5, 1] }));

      expect(result.current.isIntersecting).toBe(false);
    });
  });
});
