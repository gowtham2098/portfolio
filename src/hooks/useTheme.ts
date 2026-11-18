import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage can be unavailable (private mode, blocked cookies) */
  }
  return null;
}

function getSnapshot(): Theme {
  return (
    readStoredTheme() ??
    (window.matchMedia(DARK_QUERY).matches ? "dark" : "light")
  );
}

// The inlined <head> script already knows the real theme before first paint.
// Rendering "light" here keeps hydration deterministic: React swaps to the
// client snapshot right after hydrating, without a mismatch error.
function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    media.removeEventListener("change", onStoreChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const appliedOnce = useRef(false);

  useEffect(() => {
    // During hydration React renders with the server snapshot ("light"), and
    // the inlined <head> script has already applied the real theme. Skipping
    // this first commit avoids overwriting it with the placeholder value.
    if (!appliedOnce.current) {
      appliedOnce.current = true;
      return;
    }

    const root = document.documentElement;

    // Disable colour transitions for one paint so nothing interpolates
    // between the old and new palette while the theme flips.
    root.classList.add("theme-switching");

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        root.classList.remove("theme-switching");
      });
    });
    // Safety net: rAF is throttled in background tabs, so never leave the
    // "no transitions" class stuck on.
    const timeout = window.setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 400);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      root.classList.remove("theme-switching");
    };
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    emitChange();
  }, []);

  return { theme, toggleTheme };
}
