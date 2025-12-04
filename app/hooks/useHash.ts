import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

/**
 * Get the current hash value from window.location.
 * Returns empty string if not in browser environment.
 */
function getHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.slice(1); // Remove leading '#'
}

/**
 * Subscribe to hash change events.
 */
function subscribeToHash(callback: () => void): () => void {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

/**
 * Hook for managing URL hash state.
 *
 * @param initialHash - Optional initial hash value for SSR/Storybook environments
 * @returns Object containing current hash and setHash function
 *
 * @remarks
 * Uses useSyncExternalStore for safe concurrent rendering.
 * Syncs with browser hash changes via hashchange event.
 * In Storybook/testing environments, can be controlled via initialHash.
 */
export function useHash(initialHash?: string) {
  // Track if we're in a controlled mode (Storybook/testing)
  const [controlledHash, setControlledHash] = useState<string | undefined>(
    initialHash
  );

  // Use external store for browser hash
  const browserHash = useSyncExternalStore(
    subscribeToHash,
    getHash,
    () => initialHash ?? ""
  );

  // Use controlled hash if set, otherwise browser hash
  const hash = controlledHash !== undefined ? controlledHash : browserHash;

  const setHash = useCallback(
    (newHash: string) => {
      if (controlledHash !== undefined) {
        // Controlled mode: just update state
        setControlledHash(newHash);
      } else {
        // Browser mode: update URL
        if (newHash) {
          window.location.hash = newHash;
        } else {
          // Clear hash without page jump
          window.history.pushState(
            null,
            "",
            window.location.pathname + window.location.search
          );
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
      }
    },
    [controlledHash]
  );

  // Sync controlled hash with initial value changes
  useEffect(() => {
    if (initialHash !== undefined) {
      setControlledHash(initialHash);
    }
  }, [initialHash]);

  return { hash, setHash };
}
