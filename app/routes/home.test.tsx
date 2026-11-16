import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, featuredCases } from "~/content/cases";
import {
  FOCUS,
  FOCUSES,
  positionings,
  profilePaths,
} from "~/content/positioning";
import { testimonialsFor } from "~/content/testimonials";

import Home from "./home";

function renderHome() {
  const Stub = createRoutesStub([{ path: "/", Component: Home }]);
  render(<Stub />);
}

describe("Home", () => {
  it("affiche la phrase de positionnement comme titre principal", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Je conçois et je code des produits web.",
      }),
    ).toBeInTheDocument();
  });

  it("propose les deux portes, celle de l'angle actif en premier", () => {
    renderHome();

    const doors = within(
      screen.getByRole("region", { name: "Choisir un profil" }),
    ).getAllByRole("link");

    expect(doors.map((door) => door.getAttribute("href"))).toEqual([
      profilePaths[FOCUS],
      ...FOCUSES.filter((f) => f !== FOCUS).map((f) => profilePaths[f]),
    ]);
  });

  it("met en avant les études de cas choisies, celles de l'angle actif d'abord", () => {
    renderHome();

    const section = screen.getByRole("region", { name: /Études de cas/ });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles).toEqual(
      featuredCases(cases, positionings[FOCUS].primaryTrack).map(
        (c) => c.title.fr,
      ),
    );
  });

  it("affiche les recommandations de l'accueil", () => {
    renderHome();

    const section = screen.getByRole("region", { name: "Recommandations" });
    // Les citations affichées, dans l'ordre (le texte complet déplié peut
    // répéter la phrase : on vise donc les blockquote).
    const quotes = Array.from(section.querySelectorAll("blockquote")).map(
      (quote) => quote.textContent,
    );

    expect(quotes).toEqual(
      testimonialsFor("accueil").map(({ highlight }) => highlight.fr),
    );
  });

  it("contient les sections Parcours et Contact visées par l'en-tête", () => {
    renderHome();

    expect(document.getElementById("parcours")).not.toBeNull();
    expect(document.getElementById("contact")).not.toBeNull();
  });

  it("propose les deux CV dans le bloc contact", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: /CV développeur/ }),
    ).toHaveAttribute("href", positionings["dev-produit"].cvHref);
    expect(
      screen.getByRole("link", { name: /CV Product Owner/ }),
    ).toHaveAttribute("href", positionings.po.cvHref);
  });
});
