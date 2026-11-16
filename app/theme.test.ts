import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  applyTheme,
  nextTheme,
  readStoredTheme,
  resetThemeMemory,
  setTheme,
  getThemeSnapshot,
  THEME_STORAGE_KEY,
} from "./theme";

beforeEach(() => {
  localStorage.clear();
  resetThemeMemory();
  delete document.documentElement.dataset.theme;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("nextTheme", () => {
  it("passe de Système à Clair, puis Sombre, puis Système", () => {
    expect(nextTheme("system")).toBe("light");
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("system");
  });
});

describe("readStoredTheme", () => {
  it("suit le système quand rien n'est enregistré", () => {
    expect(readStoredTheme()).toBe("system");
  });

  it("relit un choix enregistré", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    expect(readStoredTheme()).toBe("dark");
  });

  it("ignore une valeur inconnue", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "violet");

    expect(readStoredTheme()).toBe("system");
  });

  it("suit le système si le stockage est bloqué", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });

    expect(readStoredTheme()).toBe("system");
  });
});

describe("applyTheme", () => {
  it("pose data-theme pour un choix explicite", () => {
    applyTheme("light");

    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("retire data-theme pour revenir au système", () => {
    applyTheme("dark");
    applyTheme("system");

    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});

describe("setTheme", () => {
  it("applique et enregistre le choix", () => {
    setTheme("dark");

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(getThemeSnapshot()).toBe("dark");
  });

  it("efface l'enregistrement quand on revient au système", () => {
    setTheme("dark");
    setTheme("system");

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("fonctionne pour la visite en cours même si le stockage est bloqué", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    setTheme("light");

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(getThemeSnapshot()).toBe("light");
  });
});
