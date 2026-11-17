// Thème du site : clair ou sombre. Tant que le visiteur n'a rien choisi,
// le site suit la préférence de son navigateur (prefers-color-scheme).
export const THEME_CHOICES = ["light", "dark"] as const;
export type ThemeChoice = (typeof THEME_CHOICES)[number];

export const THEME_STORAGE_KEY = "theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

// `value is ThemeChoice` : un « type guard ». Si la fonction renvoie true,
// TypeScript sait ensuite que `value` est un ThemeChoice.
function isThemeChoice(value: unknown): value is ThemeChoice {
  return (THEME_CHOICES as readonly unknown[]).includes(value);
}

export function toggleTheme(choice: ThemeChoice): ThemeChoice {
  return choice === "dark" ? "light" : "dark";
}

// Préférence du navigateur. matchMedia peut manquer (vieux navigateurs,
// tests) : on retombe alors sur le clair.
export function systemTheme(): ThemeChoice {
  if (typeof window.matchMedia !== "function") return "light";
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

// Choix enregistré lors d'une visite précédente, ou null s'il n'y en a pas.
// localStorage peut être bloqué (navigation privée, réglages) : null aussi.
export function readStoredTheme(): ThemeChoice | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeChoice(value) ? value : null;
  } catch {
    return null;
  }
}

function storeTheme(choice: ThemeChoice): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Pas d'enregistrement possible : le choix vaut pour la visite en cours.
  }
}

// data-theme sur <html> force un thème. Sans cet attribut, le CSS suit la
// préférence du navigateur (voir app.css).
export function applyTheme(
  choice: ThemeChoice,
  root: HTMLElement = document.documentElement,
): void {
  root.dataset.theme = choice;
}

// --- Petit « store » lu par useSyncExternalStore (voir ThemeToggle). ---

// Dernier choix de la visite : sert si le stockage est bloqué.
let memory: ThemeChoice | null = null;
const listeners = new Set<() => void>();

// Thème réellement affiché : choix du visiteur, sinon préférence du navigateur.
export function getThemeSnapshot(): ThemeChoice {
  return memory ?? readStoredTheme() ?? systemTheme();
}

// Pendant le prérendu, on ne connaît ni le choix ni le navigateur du
// visiteur. Le bouton se corrige juste après le chargement de la page.
export function getServerThemeSnapshot(): ThemeChoice {
  return "light";
}

export function subscribeTheme(listener: () => void): () => void {
  // Un changement fait dans un autre onglet arrive par l'événement « storage ».
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    memory = null;
    const stored = readStoredTheme();
    if (stored) applyTheme(stored);
    listener();
  };
  // Le visiteur change la préférence de son système pendant la visite.
  const media =
    typeof window.matchMedia === "function"
      ? window.matchMedia(DARK_QUERY)
      : null;

  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  media?.addEventListener("change", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    media?.removeEventListener("change", listener);
  };
}

export function setTheme(choice: ThemeChoice): void {
  memory = choice;
  storeTheme(choice);
  applyTheme(choice);
  listeners.forEach((listener) => listener());
}

// Pour les tests : oublie le choix gardé en mémoire.
export function resetThemeMemory(): void {
  memory = null;
}

// Script exécuté dans le <head>, avant l'affichage : applique le choix
// enregistré pour éviter un flash du mauvais thème. Écrit en JavaScript
// simple, car il est inséré tel quel dans le HTML.
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})();`;
