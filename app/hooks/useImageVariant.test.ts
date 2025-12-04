import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useImageVariant, IMAGE_VARIANTS, type ImageVariant } from "./useImageVariant";

// Mock the virtual:image-variants module
// Returns string directly (import.meta.glob with `import: 'default'` extracts the default export)
vi.mock("virtual:image-variants", () => ({
  imageVariants: {
    "/app/images/original/test.jpg": {
      "faceCrop&w=200&h=200&fit=cover": () => Promise.resolve("/images/test-thumb-sm.jpg"),
      "faceCrop&w=200&h=200&fit=cover&format=avif": () =>
        Promise.resolve("/images/test-thumb-sm.avif"),
      "faceCrop&w=200&h=200&fit=cover&format=webp": () =>
        Promise.resolve("/images/test-thumb-sm.webp"),
      "faceCrop&w=400&h=400&fit=cover": () => Promise.resolve("/images/test-thumb-md.jpg"),
      "faceCrop&w=400&h=400&fit=cover&format=avif": () =>
        Promise.resolve("/images/test-thumb-md.avif"),
      "faceCrop&w=400&h=400&fit=cover&format=webp": () =>
        Promise.resolve("/images/test-thumb-md.webp"),
    },
    "/app/images/scrap/scrap-test.jpg": {
      "faceCrop&w=600&h=600&fit=cover": () => Promise.resolve("/images/scrap-thumb-lg.jpg"),
      "faceCrop&w=600&h=600&fit=cover&format=avif": () =>
        Promise.resolve("/images/scrap-thumb-lg.avif"),
      "faceCrop&w=600&h=600&fit=cover&format=webp": () =>
        Promise.resolve("/images/scrap-thumb-lg.webp"),
    },
    "/app/images/original/fallback.jpg": {
      "w=1920&fit=inside": () => Promise.resolve("/images/fallback-full.jpg"),
      // Only fallback available, no avif/webp
    },
    "/app/images/original/error.jpg": {
      "faceCrop&w=200&h=200&fit=cover": () => Promise.reject(new Error("Load failed")),
      "faceCrop&w=200&h=200&fit=cover&format=avif": () => Promise.reject(new Error("Load failed")),
      "faceCrop&w=200&h=200&fit=cover&format=webp": () => Promise.reject(new Error("Load failed")),
    },
  },
}));

describe("useImageVariant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("IMAGE_VARIANTS", () => {
    it("has all expected variants defined", () => {
      expect(IMAGE_VARIANTS["thumb-sm"]).toBe("faceCrop&w=200&h=200&fit=cover");
      expect(IMAGE_VARIANTS["thumb-md"]).toBe("faceCrop&w=400&h=400&fit=cover");
      expect(IMAGE_VARIANTS["thumb-lg"]).toBe("faceCrop&w=600&h=600&fit=cover");
      expect(IMAGE_VARIANTS["face"]).toBe("faceCrop&w=200&h=200&fit=cover");
      expect(IMAGE_VARIANTS["full"]).toBe("w=1920&fit=inside");
    });
  });

  describe("initial state", () => {
    it("returns idle state initially", () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "test.jpg",
          variant: "thumb-sm",
          enabled: false,
        })
      );

      expect(result.current.sources).toBeNull();
      expect(result.current.loadState).toBe("idle");
    });
  });

  describe("loading behavior", () => {
    it("loads sources when enabled", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "test.jpg",
          variant: "thumb-sm",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources).toEqual({
        avif: "/images/test-thumb-sm.avif",
        webp: "/images/test-thumb-sm.webp",
        fallback: "/images/test-thumb-sm.jpg",
      });
    });

    it("does not load when disabled", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "test.jpg",
          variant: "thumb-sm",
          enabled: false,
        })
      );

      // Wait a tick to ensure no async operations happen
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(result.current.loadState).toBe("idle");
      expect(result.current.sources).toBeNull();
    });

    it("loads when enabled changes from false to true", async () => {
      const { result, rerender } = renderHook(
        ({ enabled }) =>
          useImageVariant({
            category: "original",
            filename: "test.jpg",
            variant: "thumb-sm",
            enabled,
          }),
        { initialProps: { enabled: false } }
      );

      expect(result.current.loadState).toBe("idle");

      rerender({ enabled: true });

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources).not.toBeNull();
    });

    it("defaults enabled to true", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "test.jpg",
          variant: "thumb-sm",
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources).not.toBeNull();
    });
  });

  describe("different categories", () => {
    it("loads from original category", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "test.jpg",
          variant: "thumb-md",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources?.fallback).toBe("/images/test-thumb-md.jpg");
    });

    it("loads from scrap category", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "scrap",
          filename: "scrap-test.jpg",
          variant: "thumb-lg",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources?.fallback).toBe("/images/scrap-thumb-lg.jpg");
    });
  });

  describe("different variants", () => {
    it("loads thumb-sm variant", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "test.jpg",
          variant: "thumb-sm",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources?.fallback).toContain("thumb-sm");
    });

    it("loads thumb-md variant", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "test.jpg",
          variant: "thumb-md",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources?.fallback).toContain("thumb-md");
    });
  });

  describe("fallback behavior", () => {
    it("uses fallback when avif/webp not available", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "fallback.jpg",
          variant: "full",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      // All formats should fall back to the original format
      expect(result.current.sources).toEqual({
        avif: "/images/fallback-full.jpg",
        webp: "/images/fallback-full.jpg",
        fallback: "/images/fallback-full.jpg",
      });
    });
  });

  describe("error handling", () => {
    it("returns error state when image not found", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "nonexistent.jpg",
          variant: "thumb-sm",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("error");
      });

      expect(result.current.sources).toBeNull();
    });

    it("returns error state when loading fails", async () => {
      const { result } = renderHook(() =>
        useImageVariant({
          category: "original",
          filename: "error.jpg",
          variant: "thumb-sm",
          enabled: true,
        })
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("error");
      });

      expect(result.current.sources).toBeNull();
    });
  });

  describe("prop changes", () => {
    it("resets and reloads when filename changes", async () => {
      const { result, rerender } = renderHook(
        ({ filename }) =>
          useImageVariant({
            category: "original",
            filename,
            variant: "thumb-sm",
            enabled: true,
          }),
        { initialProps: { filename: "test.jpg" } }
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources?.fallback).toContain("test-thumb-sm");

      rerender({ filename: "nonexistent.jpg" });

      // Should reset to idle first
      expect(result.current.sources).toBeNull();
    });

    it("resets and reloads when variant changes", async () => {
      const { result, rerender } = renderHook(
        ({ variant }: { variant: ImageVariant }) =>
          useImageVariant({
            category: "original",
            filename: "test.jpg",
            variant,
            enabled: true,
          }),
        { initialProps: { variant: "thumb-sm" as ImageVariant } }
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      expect(result.current.sources?.fallback).toContain("thumb-sm");

      rerender({ variant: "thumb-md" });

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
        expect(result.current.sources?.fallback).toContain("thumb-md");
      });
    });

    it("resets and reloads when category changes", async () => {
      const { result, rerender } = renderHook(
        ({ category }: { category: "original" | "scrap" }) =>
          useImageVariant({
            category,
            filename: "test.jpg",
            variant: "thumb-sm",
            enabled: true,
          }),
        { initialProps: { category: "original" } as { category: "original" | "scrap" } }
      );

      await waitFor(() => {
        expect(result.current.loadState).toBe("loaded");
      });

      rerender({ category: "scrap" });

      // Should reset
      expect(result.current.sources).toBeNull();
    });
  });
});
