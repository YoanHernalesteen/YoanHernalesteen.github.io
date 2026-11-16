import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, filterCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { games } from "~/content/profile";
import { testimonialsFor } from "~/content/testimonials";

import Produit from "./produit";

function renderProduit() {
  const Stub = createRoutesStub([{ path: "/produit", Component: Produit }]);
  render(<Stub initialEntries={["/produit"]} />);
}

describe("la page /produit", () => {
  it("présente le profil Product Owner", () => {
    renderProduit();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Un Product Owner qui comprend le code.",
      }),
    ).toBeInTheDocument();
  });

  it("propose le CV Product Owner, jamais le CV développeur", () => {
    renderProduit();

    for (const link of screen.getAllByRole("link", {
      name: /CV Product Owner/,
    })) {
      expect(link).toHaveAttribute("href", positionings.po.cvHref);
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

  it("présente les jeux livrés", () => {
    renderProduit();

    const section = screen.getByRole("region", { name: /25 jeux/ });
    for (const game of games) {
      expect(within(section).getByText(game.title)).toBeInTheDocument();
    }
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

    expect(document.getElementById("contact")).not.toBeNull();
  });
});
