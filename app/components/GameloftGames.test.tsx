import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  formatRating,
  GAMELOFT_ROLES,
  gameloftGames,
  gamesForRole,
} from "~/content/gameloft";
import { t } from "~/i18n";

import { GameloftGames } from "./GameloftGames";

describe("GameloftGames", () => {
  it("range chaque jeu une fois, dans son groupe, du plus au moins téléchargé", () => {
    render(<GameloftGames />);

    for (const role of GAMELOFT_ROLES) {
      const group = screen.getByRole("region", {
        name: t.gameloft.roles[role],
      });
      const names = within(group)
        .getAllByRole("listitem")
        .map((item) => within(item).getByRole("heading").textContent);

      expect(names).toEqual(
        gamesForRole(gameloftGames, role).map((game) => game.title),
      );
    }
  });

  it("garde les icônes décoratives, le nom étant écrit à côté", () => {
    render(<GameloftGames />);

    const icons = document.querySelectorAll("img");
    expect(icons.length).toBeGreaterThan(0);
    for (const icon of icons) {
      expect(icon).toHaveAttribute("alt", "");
    }
  });

  it("annonce les notes aux lecteurs d'écran sous la forme « x sur 5 »", () => {
    render(<GameloftGames />);

    const rated = gameloftGames.find((game) => game.playRating !== undefined);
    if (!rated?.playRating) throw new Error("aucun jeu noté");
    const item = screen
      .getByRole("heading", { name: rated.title })
      .closest("li");
    if (!item) throw new Error(`ligne de ${rated.title} introuvable`);

    const value = formatRating(rated.playRating);
    expect(item).toHaveTextContent(t.gameloft.ratingLabel(value));
    // La forme abrégée « x/5 » reste visible mais n'est pas lue.
    expect(within(item).getAllByText(`${value}/5`)[0]).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("signale les jeux payants, et seulement eux", () => {
    render(<GameloftGames />);

    const paidGames = gameloftGames.filter((game) => game.paid);
    expect(paidGames.length).toBeGreaterThan(0);
    for (const game of gameloftGames) {
      const item = screen
        .getByRole("heading", { name: game.title })
        .closest("li");
      if (!item) throw new Error(`ligne de ${game.title} introuvable`);
      const mention = within(item).queryByText(t.gameloft.paid);

      if (game.paid) expect(mention, game.title).toBeInTheDocument();
      else expect(mention, game.title).not.toBeInTheDocument();
    }
  });
});
