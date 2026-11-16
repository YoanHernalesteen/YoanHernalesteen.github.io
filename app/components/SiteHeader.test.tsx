import { fireEvent, render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { FOCUS, positionings } from "~/content/positioning";

import { SiteHeader } from "./SiteHeader";

function renderHeaderAt(path: string) {
  const Stub = createRoutesStub([{ path: "*", Component: SiteHeader }]);
  render(<Stub initialEntries={[path]} />);
}

describe("SiteHeader", () => {
  it("affiche les liens de navigation principaux", () => {
    renderHeaderAt("/");

    expect(screen.getByRole("link", { name: "Études de cas" })).toHaveAttribute(
      "href",
      "/cas",
    );
    expect(screen.getByRole("link", { name: "Parcours" })).toHaveAttribute(
      "href",
      "/#parcours",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "#contact",
    );
  });

  it("renvoie vers le contact de l'accueil depuis une page sans bloc contact", () => {
    renderHeaderAt("/cas");

    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/#contact",
    );
  });

  it("propose le CV de l'angle actif sur l'accueil", () => {
    renderHeaderAt("/");

    expect(
      screen.getByRole("link", { name: "Télécharger mon CV" }),
    ).toHaveAttribute("href", positionings[FOCUS].cvHref);
  });

  it("propose le CV développeur sur /dev", () => {
    renderHeaderAt("/dev");

    expect(
      screen.getByRole("link", { name: "CV développeur" }),
    ).toHaveAttribute("href", positionings["dev-produit"].cvHref);
  });

  it("propose le CV Product Owner sur /produit", () => {
    renderHeaderAt("/produit");

    expect(
      screen.getByRole("link", { name: "CV Product Owner" }),
    ).toHaveAttribute("href", positionings.po.cvHref);
  });

  it("ouvre et ferme le menu mobile", () => {
    renderHeaderAt("/");
    const button = screen.getByRole("button", { name: "Ouvrir le menu" });

    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: "Fermer le menu" }),
    ).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(screen.getByRole("navigation"), { key: "Escape" });
    expect(
      screen.getByRole("button", { name: "Ouvrir le menu" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
