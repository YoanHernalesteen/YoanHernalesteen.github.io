import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { resetThemeMemory, THEME_STORAGE_KEY } from "~/theme";

import { ThemeToggle } from "./ThemeToggle";

beforeEach(() => {
  localStorage.clear();
  resetThemeMemory();
  delete document.documentElement.dataset.theme;
});

describe("ThemeToggle", () => {
  it("indique le thème du système par défaut", () => {
    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Thème : Système" }),
    ).toBeInTheDocument();
  });

  it("passe d'un thème à l'autre à chaque clic", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    act(() => fireEvent.click(button));
    expect(button).toHaveAccessibleName("Thème : Clair");
    expect(document.documentElement.dataset.theme).toBe("light");

    act(() => fireEvent.click(button));
    expect(button).toHaveAccessibleName("Thème : Sombre");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    act(() => fireEvent.click(button));
    expect(button).toHaveAccessibleName("Thème : Système");
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it("reprend le choix enregistré lors d'une visite précédente", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Thème : Sombre" }),
    ).toBeInTheDocument();
  });
});
