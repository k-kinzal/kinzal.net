import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

/**
 * Theme value that can be set by the user.
 */
type Theme = "light" | "dark" | "system";

/**
 * The actual theme applied to the document.
 */
type ResolvedTheme = "light" | "dark";

/**
 * Context value provided by ThemeProvider.
 */
interface ThemeContextType {
  /** Current theme setting */
  theme: Theme;
  /** Actual theme applied (resolves "system" to "light" or "dark") */
  resolvedTheme: ResolvedTheme;
  /** Function to update the theme */
  setTheme: (theme: Theme) => void;
  /** Whether the component has mounted (for SSR hydration) */
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  /** Child components to wrap */
  children: ReactNode;
  /**
   * Initial theme value.
   * @defaultValue "system"
   */
  defaultTheme?: Theme;
  /**
   * localStorage key for persisting theme.
   * @defaultValue "theme"
   */
  storageKey?: string;
}

/**
 * Provider component for theme context.
 *
 * @remarks
 * Wraps your app to provide theme switching functionality.
 * Automatically persists theme preference to localStorage.
 * Handles SSR hydration by providing a `mounted` flag.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  // Mark as mounted after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setThemeState(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark");
        setResolvedTheme("dark");
      } else {
        root.classList.remove("dark");
        setResolvedTheme("light");
      }
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }
    },
    [storageKey]
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access and control the current theme.
 *
 * @remarks
 * Must be used within a ThemeProvider. Returns the current theme,
 * resolved theme, and a function to update the theme.
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, setTheme, mounted } = useTheme();
 *
 *   // Avoid hydration mismatch by not rendering until mounted
 *   if (!mounted) return null;
 *
 *   return (
 *     <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
 *       Toggle theme
 *     </button>
 *   );
 * }
 * ```
 *
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

ThemeProvider.displayName = "ThemeProvider";
