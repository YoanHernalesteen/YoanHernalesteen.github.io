import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, filterCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { testimonialsFor } from "~/content/testimonials";

import Dev from "./dev";

function renderDev() {
  const Stub = createRoutesStub([{ path: "/dev", Component: Dev }]);
  render(<Stub initialEntries={["/dev"]} />);
}

describe("la page /dev", () => {
  it("présente le profil développeur", () => {
    renderDev();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Développeur Ruby on Rails/,
      }),
    ).toBeInTheDocument();
  });

  it("propose le CV développeur et le GitHub, jamais le CV PO", () => {
    renderDev();

    for (const link of screen.getAllByRole("link", {
      name: /CV développeur/,
    })) {
      expect(link).toHaveAttribute("href", positionings["dev-produit"].cvHref);
    }
    expect(
      screen.getByRole("link", { name: "Voir mon GitHub" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /CV Product Owner/ }),
    ).not.toBeInTheDocument();
  });

  it("liste les études de cas de la piste dev", () => {
    renderDev();

    const section = screen.getByRole("region", {
      name: /Du code en production/,
    });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles).toEqual(filterCases(cases, "dev").map((c) => c.title.fr));
  });

  it("affiche la recommandation choisie pour cette page", () => {
    renderDev();

    const quotes = Array.from(document.querySelectorAll("blockquote")).map(
      (q) => q.textContent,
    );
    expect(quotes).toEqual(
      testimonialsFor("dev").map(({ highlight }) => highlight.fr),
    );
  });

  it("se termine par un bloc contact", () => {
    renderDev();

    expect(document.getElementById("contact")).not.toBeNull();
  });
});
