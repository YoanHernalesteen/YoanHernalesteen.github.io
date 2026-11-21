import { describe, expect, it } from "vitest";

import {
  formatInstalls,
  formatRating,
  GAMELOFT_ROLES,
  gameloftGames,
  gamesForRole,
  type GameloftGame,
} from "./gameloft";

describe("formatInstalls", () => {
  it("écrit la tranche de téléchargements comme Google Play, en français", () => {
    expect(formatInstalls(500_000_000)).toBe("500\u00a0M+");
    expect(formatInstalls(1_000_000)).toBe("1\u00a0M+");
    expect(formatInstalls(100_000)).toBe("100\u00a0k+");
  });
});

describe("formatRating", () => {
  it("écrit la note avec une décimale et une virgule", () => {
    expect(formatRating(4.4)).toBe("4,4");
    expect(formatRating(4)).toBe("4,0");
  });
});

describe("gamesForRole", () => {
  const game = (title: string, playInstalls?: number): GameloftGame => ({
    title,
    icon: "",
    role: "creation",
    playInstalls,
  });

  it("classe les jeux du plus au moins téléchargé, sans chiffre en dernier", () => {
    const list = [
      game("Sans chiffre"),
      game("Petit", 1_000_000),
      game("Gros", 100_000_000),
      game("Moyen A", 10_000_000),
      game("Moyen B", 10_000_000),
    ];

    expect(gamesForRole(list, "creation").map((g) => g.title)).toEqual([
      "Gros",
      "Moyen A",
      "Moyen B",
      "Petit",
      "Sans chiffre",
    ]);
  });

  it("ne garde que les jeux du rôle demandé", () => {
    const list = [
      game("Création"),
      { ...game("Mises à jour"), role: "updates" as const },
    ];

    expect(gamesForRole(list, "updates").map((g) => g.title)).toEqual([
      "Mises à jour",
    ]);
  });
});

describe("les jeux Gameloft", () => {
  it("ont chacun un nom unique", () => {
    const titles = gameloftGames.map((game) => game.title);

    expect(new Set(titles).size).toBe(titles.length);
  });

  it("ont un rôle connu", () => {
    for (const game of gameloftGames) {
      expect(GAMELOFT_ROLES, game.title).toContain(game.role);
    }
  });

  it("n'ont que des notes entre 0 et 5 et des tranches positives", () => {
    for (const game of gameloftGames) {
      for (const rating of [game.playRating, game.appStoreRating]) {
        if (rating === undefined) continue;
        expect(rating, game.title).toBeGreaterThan(0);
        expect(rating, game.title).toBeLessThanOrEqual(5);
      }
      if (game.playInstalls !== undefined) {
        expect(game.playInstalls, game.title).toBeGreaterThan(0);
      }
    }
  });
});
