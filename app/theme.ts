// Choix du thème : suivre le système, ou forcer le clair ou le sombre.
export const THEME_CHOICES = ["system", "light", "dark"] as const;
export type ThemeChoice = (typeof THEME_CHOICES)[number];

export const THEME_STORAGE_KEY = "theme";

// `value is ThemeChoice` : un « type guard ». Si la fonction renvoie true,
// TypeScript sait ensuite que `value` est un ThemeChoice.
function isThemeChoice(value: unknown): value is ThemeChoice {
  return (THEME_CHOICES as readonly unknown[]).includes(value);
}

export function nextTheme(choice: ThemeChoice): ThemeChoice {
  const index = THEME_CHOICES.indexOf(choice);
  return THEME_CHOICES[(index + 1) % THEME_CHOICES.length];
}

// localStorage peut être bloqué (navigation privée, réglages) : on retombe
// alors sur le thème du système.
export function readStoredTheme(): ThemeChoice {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeChoice(value) ? value : "system";
  } catch {
    return "system";
  }
}

function storeTheme(choice: ThemeChoice): void {
  try {
    if (choice === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Pas d'enregistrement possible : le choix vaut pour la visite en cours.
  }
}

// data-theme sur <html> force un thème ; son absence laisse le système décider.
export function applyTheme(
  choice: ThemeChoice,
  root: HTMLElement = document.documentElement,
): void {
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
}

// --- Petit « store » lu par useSyncExternalStore (voir ThemeToggle). ---

// Dernier choix de la visite : sert si le stockage est bloqué.
let memory: ThemeChoice | null = null;
const listeners = new Set<() => void>();

export function getThemeSnapshot(): ThemeChoice {
  return memory ?? readStoredTheme();
}

// Pendant le prérendu, on ne connaît pas le choix du visiteur.
export function getServerThemeSnapshot(): ThemeChoice {
  return "system";
}

export function subscribeTheme(listener: () => void): () => void {
  // Un changement fait dans un autre onglet arrive par l'événement « storage ».
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    memory = null;
    applyTheme(readStoredTheme());
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
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
