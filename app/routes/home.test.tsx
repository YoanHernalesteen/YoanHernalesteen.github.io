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
import { career } from "~/content/profile";
import { site } from "~/content/site";
import { speedrunActivities } from "~/content/speedrun";
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

    const section = screen.getByRole("region", {
      name: "Recommandations Ils ont travaillé avec moi",
    });
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

  it("étiquette chaque étape du parcours comme formation ou poste", () => {
    renderHome();

    const timeline = document.getElementById("parcours");
    if (!timeline) throw new Error("section parcours introuvable");
    const labels = { formation: "Formation", poste: "Poste" } as const;

    for (const step of career) {
      expect(
        within(timeline).getByText(`${labels[step.kind]} · ${step.period.fr}`),
      ).toBeInTheDocument();
    }
  });

  it("résume le profil en trois piliers, sans chiffres clés", () => {
    renderHome();

    const section = screen.getByRole("region", { name: "Mon profil en bref" });
    expect(
      within(section)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent),
    ).toEqual([
      "Je pars de l'utilisateur",
      "Je décide avec des données",
      "Je code ce que je conçois",
    ]);
    expect(
      screen.queryByRole("region", { name: "En chiffres" }),
    ).not.toBeInTheDocument();
  });

  it("propose les crédits MobyGames sous le parcours", () => {
    renderHome();

    const timeline = document.getElementById("parcours");
    if (!timeline) throw new Error("section parcours introuvable");
    expect(
      within(timeline).getByRole("link", { name: /MobyGames/ }),
    ).toHaveAttribute("href", site.mobygames);
  });

  it("ajoute une icône décorative devant chaque étiquette", () => {
    renderHome();

    const timeline = document.getElementById("parcours");
    if (!timeline) throw new Error("section parcours introuvable");
    const icons = timeline.querySelectorAll("li svg");

    expect(icons).toHaveLength(career.length);
    for (const icon of icons) {
      // Masquée aux lecteurs d'écran : l'étiquette écrite suffit.
      expect(icon).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("distingue formations et postes par leur icône", () => {
    renderHome();

    const timeline = document.getElementById("parcours");
    if (!timeline) throw new Error("section parcours introuvable");
    const icons = Array.from(timeline.querySelectorAll("li svg"));

    expect(icons.map((icon) => icon.getAttribute("data-icon"))).toEqual(
      career.map((step) =>
        step.kind === "formation" ? "graduation-cap" : "briefcase",
      ),
    );
  });

  it("affiche le logo des entreprises qui en ont un, en décoration", () => {
    renderHome();

    const timeline = document.getElementById("parcours");
    if (!timeline) throw new Error("section parcours introuvable");
    const logos = Array.from(timeline.querySelectorAll("li img"));

    expect(logos.length).toBeGreaterThan(0);
    expect(logos.map((logo) => logo.getAttribute("src"))).toEqual(
      career.flatMap((step) => (step.logo ? [step.logo] : [])),
    );
    for (const logo of logos) {
      // Le nom de l'entreprise est écrit juste à côté.
      expect(logo).toHaveAttribute("alt", "");
    }
  });

  it("présente les activités speedrun, avec leurs liens", () => {
    renderHome();

    const section = screen.getByRole("region", {
      name: /Organiser des événements en direct/,
    });
    for (const activity of speedrunActivities) {
      expect(
        within(section).getByRole("heading", { level: 3, name: activity.name }),
      ).toBeInTheDocument();
      for (const link of activity.links ?? []) {
        expect(
          within(section).getByRole("link", { name: link.label }),
        ).toHaveAttribute("href", link.href);
      }
      if (activity.caseSlug) {
        expect(
          within(section).getByRole("link", { name: /étude de cas/ }),
        ).toHaveAttribute("href", `/cas/${activity.caseSlug}`);
      }
    }
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
