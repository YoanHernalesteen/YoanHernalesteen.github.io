import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases } from "~/content/cases";
import { games, gamesNewestFirst } from "~/content/profile";
import { site } from "~/content/site";

import Cases from "./cases";

function renderCases() {
  const Stub = createRoutesStub([{ path: "/cas", Component: Cases }]);
  render(<Stub initialEntries={["/cas"]} />);
}

describe("la page /cas", () => {
  it("annonce ce que contient chaque cas, et un filtre par domaine", () => {
    renderCases();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Des problèmes, des décisions, des résultats",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Filtrez par domaine : produit ou développement\.$/),
    ).toBeInTheDocument();
  });

  it("liste tous les jeux livrés, du plus récent au plus ancien", () => {
    renderCases();

    const section = screen.getByRole("region", { name: /25 jeux/ });
    expect(section).toHaveAttribute("id", "jeux");
    expect(
      within(section)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(gamesNewestFirst(games).map((game) => game.title));
    expect(
      within(section).getByRole("link", { name: /MobyGames/ }),
    ).toHaveAttribute("href", site.mobygames);
  });

  it("garde une hiérarchie de titres sans saut, du h1 aux cartes", () => {
    renderCases();

    const headings = screen
      .getAllByRole("heading")
      .map((h) => Number(h.tagName.slice(1)));

    expect(headings.slice(0, 3)).toEqual([1, 2, 3]);
  });

  it("liste toutes les études de cas", () => {
    renderCases();

    for (const study of cases) {
      expect(
        screen.getByRole("link", { name: study.title.fr }),
      ).toBeInTheDocument();
    }
  });
});
