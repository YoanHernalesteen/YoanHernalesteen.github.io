import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, sortCasesForTrack } from "~/content/cases";
import { FOCUS, positionings } from "~/content/positioning";
import { fr } from "~/i18n/fr";

import Home from "./home";

function renderHome() {
  const Stub = createRoutesStub([{ path: "/", Component: Home }]);
  render(<Stub />);
}

describe("Home", () => {
  it("affiche le nom comme titre principal", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { level: 1, name: "Yoan Hernalesteen" }),
    ).toBeInTheDocument();
  });

  it("affiche le rôle et le CV de l'angle actif", () => {
    renderHome();

    expect(screen.getByText(fr.positioning[FOCUS].role)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: fr.positioning[FOCUS].cvLabel }),
    ).toHaveAttribute("href", positionings[FOCUS].cvHref);
  });

  it("liste les études de cas de l'angle actif en premier", async () => {
    renderHome();

    const section = screen.getByRole("region", { name: "Études de cas" });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles).toEqual(
      sortCasesForTrack(cases, positionings[FOCUS].primaryTrack).map(
        (c) => c.title.fr,
      ),
    );
  });
});
