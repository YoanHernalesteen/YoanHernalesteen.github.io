import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, filterCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { games, gamesNewestFirst } from "~/content/profile";
import { testimonialsFor } from "~/content/testimonials";

import Produit from "./produit";

function renderProduit() {
  const Stub = createRoutesStub([{ path: "/produit", Component: Produit }]);
  render(<Stub initialEntries={["/produit"]} />);
}

describe("la page /produit", () => {
  it("présente le profil Product Manager", () => {
    renderProduit();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Un Product Manager qui comprend le code.",
      }),
    ).toBeInTheDocument();
  });

  it("ouvre sur l'expérience de Senior et cite aussi Product Owner", () => {
    renderProduit();

    const lede = screen.getByText(/^16 ans de jeu vidéo, dont 9 comme Senior/);
    expect(lede).toHaveTextContent("Product Owner");
  });

  it("propose le CV Product Manager, jamais le CV développeur", () => {
    renderProduit();

    for (const link of screen.getAllByRole("link", {
      name: /CV Product Manager/,
    })) {
      expect(link).toHaveAttribute("href", positionings.pm.cvHref);
    }
    expect(
      screen.queryByRole("link", { name: /CV développeur/ }),
    ).not.toBeInTheDocument();
  });

  it("décrit la méthode en 4 étapes", () => {
    renderProduit();

    const section = screen.getByRole("region", { name: /Ma méthode/ });
    expect(within(section).getAllByRole("listitem")).toHaveLength(4);
  });

  it("liste les études de cas de la piste produit", () => {
    renderProduit();

    const section = screen.getByRole("region", {
      name: /Des décisions fondées sur des preuves/,
    });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles).toEqual(
      filterCases(cases, "produit").map((c) => c.title.fr),
    );
  });

  it("présente les jeux livrés, du plus récent au plus ancien", () => {
    renderProduit();

    const section = screen.getByRole("region", { name: /25 jeux/ });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles).toEqual(gamesNewestFirst(games).map((game) => game.title));
  });

  it("affiche les visuels des jeux avec leur copyright, sans emplacement vide", () => {
    renderProduit();

    const section = screen.getByRole("region", { name: /25 jeux/ });
    for (const game of games) {
      if (!game.image) continue;
      const image = within(section).getByRole("img", {
        name: game.image.alt.fr,
      });
      // Le copyright est dans la légende de cette image précise.
      const figure = image.closest("figure");
      if (!figure) throw new Error(`pas de légende pour ${game.title}`);
      expect(within(figure).getByText(game.image.credit)).toBeInTheDocument();
    }
    expect(within(section).queryByText(/\[Visuel/)).not.toBeInTheDocument();
    expect(within(section).queryByText(/\[Mosaïque/)).not.toBeInTheDocument();
  });

  it("affiche les recommandations choisies pour cette page", () => {
    renderProduit();

    const quotes = Array.from(document.querySelectorAll("blockquote")).map(
      (q) => q.textContent,
    );
    expect(quotes).toEqual(
      testimonialsFor("produit").map(({ highlight }) => highlight.fr),
    );
  });

  it("se termine par un bloc contact", () => {
    renderProduit();

    const contact = document.getElementById("contact");
    if (!contact) throw new Error("pas de bloc contact");
    expect(
      within(contact).getByRole("heading", {
        name: "Me contacter pour un poste de Product Manager ou de Product Owner",
      }),
    ).toBeInTheDocument();
  });
});
