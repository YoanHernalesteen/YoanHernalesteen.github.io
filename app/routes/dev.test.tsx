import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, filterCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { testimonialsFor } from "~/content/testimonials";
import { t } from "~/i18n";

import Dev from "./dev";

function renderDev() {
  const Stub = createRoutesStub([{ path: "/dev", Component: Dev }]);
  render(<Stub initialEntries={["/dev"]} />);
}

describe("la page /dev", () => {
  it("ne propose que le CV développeur, avec le GitHub", () => {
    renderDev();

    const cvLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.endsWith(".pdf"));

    expect(cvLinks.length).toBeGreaterThan(0);
    for (const link of cvLinks) {
      expect(link).toHaveAttribute("href", positionings["dev-produit"].cvHref);
    }
    for (const link of screen.getAllByRole("link", { name: /GitHub/ })) {
      expect(link).toHaveAttribute("href", site.github);
    }
  });

  it("liste les études de cas de la piste dev", () => {
    renderDev();

    const section = screen.getByRole("region", {
      name: `${t.dev.casesEyebrow} ${t.dev.casesTitle}`,
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

  it("contient le bloc contact visé par l'en-tête", () => {
    renderDev();

    expect(document.getElementById("contact")).not.toBeNull();
  });
});
