import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { mockSystemTheme } from "~/test/mockSystemTheme";
import { resetThemeMemory, THEME_STORAGE_KEY } from "~/theme";

import { ThemeToggle } from "./ThemeToggle";

beforeEach(() => {
  localStorage.clear();
  resetThemeMemory();
  delete document.documentElement.dataset.theme;
  mockSystemTheme("light");
});

describe("ThemeToggle", () => {
  it("est un interrupteur « Thème sombre »", () => {
    render(<ThemeToggle />);

    expect(
      screen.getByRole("button", { name: "Thème sombre" }),
    ).toBeInTheDocument();
  });

  it("reflète le thème du navigateur par défaut", () => {
    mockSystemTheme("dark");

    render(<ThemeToggle />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("bascule entre clair et sombre, et mémorise le choix", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");

    act(() => fireEvent.click(button));
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");

    act(() => fireEvent.click(button));
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
  });

  it("montre le thème affiché : soleil en clair, lune en sombre", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toHaveAttribute("data-icon", "sun");

    act(() => fireEvent.click(button));
    expect(button.querySelector("svg")).toHaveAttribute("data-icon", "moon");
  });

  it("reprend le choix enregistré lors d'une visite précédente", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");

    render(<ThemeToggle />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
