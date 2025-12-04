import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHash } from "./useHash";

describe("useHash", () => {
  const originalLocation = window.location;
  const originalHistory = window.history;

  beforeEach(() => {
    // Reset hash before each test
    window.location.hash = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("controlled mode (with initialHash)", () => {
    it("returns initial hash value", () => {
      const { result } = renderHook(() => useHash("test-hash"));

      expect(result.current.hash).toBe("test-hash");
    });

    it("updates hash via setHash in controlled mode", () => {
      const { result } = renderHook(() => useHash("initial"));

      act(() => {
        result.current.setHash("updated");
      });

      expect(result.current.hash).toBe("updated");
    });

    it("clears hash when setHash is called with empty string", () => {
      const { result } = renderHook(() => useHash("initial"));

      act(() => {
        result.current.setHash("");
      });

      expect(result.current.hash).toBe("");
    });

    it("updates when initialHash prop changes", () => {
      const { result, rerender } = renderHook(({ initialHash }) => useHash(initialHash), {
        initialProps: { initialHash: "first" },
      });

      expect(result.current.hash).toBe("first");

      rerender({ initialHash: "second" });

      expect(result.current.hash).toBe("second");
    });
  });

  describe("browser mode (without initialHash)", () => {
    it("returns empty string when no hash is set", () => {
      window.location.hash = "";
      const { result } = renderHook(() => useHash());

      expect(result.current.hash).toBe("");
    });

    it("returns current hash from window.location", () => {
      window.location.hash = "#browser-hash";
      const { result } = renderHook(() => useHash());

      expect(result.current.hash).toBe("browser-hash");
    });

    it("updates hash via setHash updates window.location", () => {
      const { result } = renderHook(() => useHash());

      act(() => {
        result.current.setHash("new-hash");
      });

      expect(window.location.hash).toBe("#new-hash");
    });

    it("responds to hashchange events", () => {
      const { result } = renderHook(() => useHash());

      act(() => {
        window.location.hash = "#external-change";
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      });

      expect(result.current.hash).toBe("external-change");
    });

    it("clears hash without page jump when setHash is called with empty string", () => {
      window.location.hash = "#to-clear";
      const pushStateSpy = vi.spyOn(window.history, "pushState");

      const { result } = renderHook(() => useHash());

      act(() => {
        result.current.setHash("");
      });

      expect(pushStateSpy).toHaveBeenCalled();
    });
  });

  describe("setHash stability", () => {
    it("setHash function reference remains stable", () => {
      const { result, rerender } = renderHook(() => useHash("test"));

      const firstSetHash = result.current.setHash;

      rerender();

      expect(result.current.setHash).toBe(firstSetHash);
    });
  });
});
