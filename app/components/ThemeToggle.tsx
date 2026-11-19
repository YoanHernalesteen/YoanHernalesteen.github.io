import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const icons: Record<ThemeChoice, IconDefinition> = {
  light: faSun,
  dark: faMoon,
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
      <FontAwesomeIcon
        icon={icons[theme]}
        aria-hidden="true"
        className="text-lg"
      />
    </button>
  );
}
