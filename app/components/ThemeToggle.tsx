import { useSyncExternalStore } from "react";

import { t } from "~/i18n";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  setTheme,
  subscribeTheme,
  toggleTheme,
  type ThemeChoice,
} from "~/theme";

// Icônes décoratives : le nom et l'état du bouton portent l'information.
// On montre le thème affiché : soleil en clair, lune en sombre.
const icons: Record<ThemeChoice, React.ReactNode> = {
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
};

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  return (
    <button
      type="button"
      aria-label={t.theme.dark}
      aria-pressed={theme === "dark"}
      title={t.theme.dark}
      onClick={() => setTheme(toggleTheme(theme))}
      className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line-strong bg-surface text-ink"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icons[theme]}
      </svg>
    </button>
  );
}
