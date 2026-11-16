import { useSyncExternalStore } from "react";

import { t } from "~/i18n";
import {
  getServerThemeSnapshot,
  getThemeSnapshot,
  nextTheme,
  setTheme,
  subscribeTheme,
  type ThemeChoice,
} from "~/theme";

// Icônes décoratives : le nom du bouton porte l'information.
const icons: Record<ThemeChoice, React.ReactNode> = {
  system: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
};

export function ThemeToggle() {
  // useSyncExternalStore lit une valeur qui vit hors de React (ici le
  // localStorage) et réaffiche le composant quand elle change. Le 3e
  // argument donne la valeur utilisée au prérendu : « system ».
  const choice = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const label = `${t.theme.label} : ${t.theme[choice]}`;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme(choice))}
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
        {icons[choice]}
      </svg>
    </button>
  );
}
