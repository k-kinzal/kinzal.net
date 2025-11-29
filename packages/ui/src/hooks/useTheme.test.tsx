import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./useTheme";
import type { ReactNode } from "react";

// Mock matchMedia
const createMatchMedia = (matches: boolean) => {
  return vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

beforeEach(() => {
  // Reset matchMedia mock
  window.matchMedia = createMatchMedia(false);
  // Clear localStorage
  localStorage.clear();
  // Remove dark class from document
  document.documentElement.classList.remove("dark");
});

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <div>Test child</div>
      </ThemeProvider>
    );
    expect(screen.getByText("Test child")).toBeInTheDocument();
  });

  it("provides default theme value as system", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("system");
  });

  it("accepts custom default theme", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("dark");
  });
});

describe("useTheme", () => {
  it("throws error when used outside provider", () => {
    // Suppress console.error for this test as React logs the error
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");

    consoleSpy.mockRestore();
  });

  it("can set theme to light", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("light");
    });

    expect(result.current.theme).toBe("light");
    expect(result.current.resolvedTheme).toBe("light");
  });

  it("can set theme to dark", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
    expect(result.current.resolvedTheme).toBe("dark");
  });

  it("persists theme to localStorage", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("dark");
    });

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("reads theme from localStorage on mount", () => {
    localStorage.setItem("theme", "dark");

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    // Need to wait for useEffect to run
    expect(result.current.theme).toBe("dark");
  });

  it("uses custom storage key", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider storageKey="custom-theme">{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("dark");
    });

    expect(localStorage.getItem("custom-theme")).toBe("dark");
  });

  it("adds dark class to document when dark theme", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("dark");
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class from document when light theme", () => {
    document.documentElement.classList.add("dark");

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme("light");
    });

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("respects system preference when theme is system", () => {
    // Mock system preference as dark
    window.matchMedia = createMatchMedia(true);

    const wrapper = ({ children }: { children: ReactNode }) => (
      <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe("system");
    expect(result.current.resolvedTheme).toBe("dark");
  });
});
