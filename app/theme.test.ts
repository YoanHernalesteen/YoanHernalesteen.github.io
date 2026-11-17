import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { mockSystemTheme } from "~/test/mockSystemTheme";

import {
  applyTheme,
  getThemeSnapshot,
  readStoredTheme,
  resetThemeMemory,
  setTheme,
  systemTheme,
  THEME_STORAGE_KEY,
  toggleTheme,
} from "./theme";

beforeEach(() => {
  localStorage.clear();
  resetThemeMemory();
  delete document.documentElement.dataset.theme;
  mockSystemTheme("light");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("toggleTheme", () => {
  it("passe du clair au sombre et inversement", () => {
    expect(toggleTheme("light")).toBe("dark");
    expect(toggleTheme("dark")).toBe("light");
  });
});

describe("systemTheme", () => {
  it("suit la préférence du navigateur", () => {
    mockSystemTheme("dark");
    expect(systemTheme()).toBe("dark");

    mockSystemTheme("light");
    expect(systemTheme()).toBe("light");
  });
});

describe("readStoredTheme", () => {
  it("renvoie null quand rien n'est enregistré", () => {
    expect(readStoredTheme()).toBeNull();
  });

  it("relit un choix enregistré", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    expect(readStoredTheme()).toBe("dark");
  });

  it("ignore une valeur inconnue, y compris l'ancien « system »", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "system");

    expect(readStoredTheme()).toBeNull();
  });

  it("renvoie null si le stockage est bloqué", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });

    expect(readStoredTheme()).toBeNull();
  });
});

describe("getThemeSnapshot", () => {
  it("suit le navigateur tant que le visiteur n'a rien choisi", () => {
    mockSystemTheme("dark");

    expect(getThemeSnapshot()).toBe("dark");
  });

  it("privilégie le choix enregistré", () => {
    mockSystemTheme("dark");
    localStorage.setItem(THEME_STORAGE_KEY, "light");

    expect(getThemeSnapshot()).toBe("light");
  });
});

describe("applyTheme", () => {
  it("pose data-theme sur <html>", () => {
    applyTheme("light");

    expect(document.documentElement.dataset.theme).toBe("light");
  });
});

describe("setTheme", () => {
  it("applique et enregistre le choix", () => {
    setTheme("dark");

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(getThemeSnapshot()).toBe("dark");
  });

  it("fonctionne pour la visite en cours même si le stockage est bloqué", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    setTheme("dark");

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(getThemeSnapshot()).toBe("dark");
  });
});
