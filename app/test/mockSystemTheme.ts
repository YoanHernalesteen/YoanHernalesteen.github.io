import { vi } from "vitest";

// jsdom n'implémente pas window.matchMedia : on simule la préférence de
// thème du navigateur (prefers-color-scheme).
export function mockSystemTheme(theme: "light" | "dark"): void {
  vi.stubGlobal(
    "matchMedia",
    (query: string): MediaQueryList =>
      ({
        matches: query === "(prefers-color-scheme: dark)" && theme === "dark",
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) satisfies MediaQueryList,
  );
}
