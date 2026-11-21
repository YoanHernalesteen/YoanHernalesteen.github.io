import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, featuredCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { career } from "~/content/profile";
import { site } from "~/content/site";
import { speedrunActivities } from "~/content/speedrun";
import { testimonialsFor } from "~/content/testimonials";
import { fr } from "~/i18n/fr";

import Home, { meta } from "./home";

function renderHome() {
  const Stub = createRoutesStub([{ path: "/", Component: Home }]);
  render(<Stub />);
}

describe("Home", () => {
  it("ouvre sur la présentation Product Manager", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Un Product Manager qui comprend le code.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^16 ans de jeu vidéo, dont 9 comme Senior/),
    ).toBeInTheDocument();
  });

  it("présente le profil Product Manager dans le surtitre et l'onglet", () => {
    renderHome();

    expect(
      screen.getByText("Product Manager au profil technique"),
    ).toBeInTheDocument();
    expect(meta()).toContainEqual({
      title: `${site.name} · Product Manager au profil technique`,
    });
  });

  it("donne une description courte, que Google et LinkedIn n'auront pas à couper", () => {
    const description = meta().find(
      (tag) => "name" in tag && tag.name === "description",
    );

    expect(description).toBeDefined();
    expect(
      String(description && "content" in description ? description.content : "")
        .length,
    ).toBeLessThanOrEqual(160);
  });

  it("propose sous l'introduction le CV et les études de cas", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: "Télécharger le CV Product Manager" }),
    ).toHaveAttribute("href", positionings.pm.cvHref);

    const casesLink = screen.getByRole("link", {
      name: /Voir les études de cas/,
    });
    const target = casesLink.getAttribute("href") ?? "";
    expect(target).toMatch(/^#/);
    expect(document.getElementById(target.slice(1))).toContainElement(
      screen.getByRole("heading", {
        level: 2,
        name: "Ce que j'ai conçu et livré",
      }),
    );
  });

  it("propose le profil développeur dans un lien à part, sous les boutons", () => {
    renderHome();

    const cvLink = screen.getByRole("link", {
      name: "Télécharger le CV Product Manager",
    });
    const devLink = screen.getByRole("link", {
      name: "Voir mes expériences de développement →",
    });

    expect(devLink).toHaveAttribute("href", "/dev");
    expect(cvLink.parentElement).not.toContainElement(devLink);
    expect(
      cvLink.compareDocumentPosition(devLink) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("présente la méthode en 4 étapes, celle de la page produit", () => {
    renderHome();

    const section = screen.getByRole("region", { name: /Ma méthode/ });
    const steps = within(section).getAllByRole("listitem");

    expect(
      steps.map((step) => within(step).getByRole("heading").textContent),
    ).toEqual(["Comprendre", "Prioriser", "Livrer", "Mesurer"]);
    steps.forEach((step, index) => {
      expect(step).toHaveTextContent(fr.produit.method[index].text);
    });
  });

  it("met en avant les études de cas choisies, celles de l'angle actif d'abord", () => {
    renderHome();

    const section = screen.getByRole("region", { name: /Études de cas/ });
    const titles = within(section)
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);

    expect(titles).toEqual(
      featuredCases(cases, "produit").map((c) => c.title.fr),
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

  it("met en avant des qualités de Product Manager dans les recommandations", () => {
    renderHome();

    const quotes = Array.from(document.querySelectorAll("blockquote")).map(
      (quote) => quote.textContent,
    );

    expect(quotes).toEqual([
      expect.stringContaining("vision produit particulièrement fine"),
      expect.stringContaining("retours constructifs, pertinents et argumentés"),
      expect.stringContaining("repéré et anticipé d'innombrables problèmes"),
    ]);
  });

  it("contient les sections Parcours et Contact visées par l'en-tête", () => {
    renderHome();

    expect(document.getElementById("parcours")).not.toBeNull();
    expect(document.getElementById("contact")).not.toBeNull();
  });

  it("présente le parcours comme un passage du game design au produit", () => {
    renderHome();

    const timeline = document.getElementById("parcours");
    if (!timeline) throw new Error("section parcours introuvable");
    expect(
      within(timeline).getByRole("heading", { level: 2 }),
    ).toHaveTextContent("Du game design au produit");
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

  it("montre le logo de chaque événement de speedrun", () => {
    renderHome();

    const section = screen.getByRole("region", {
      name: /Organiser des événements en direct/,
    });
    const articles = within(section).getAllByRole("article");

    expect(articles).toHaveLength(speedrunActivities.length);
    for (const article of articles) {
      // Décoratif : l'événement est déjà nommé dans le titre ou le texte.
      expect(article.querySelector("img")).toHaveAttribute("alt", "");
    }
  });

  it("ne propose que le CV Product Manager dans le bloc contact", () => {
    renderHome();

    const contact = document.getElementById("contact");
    if (!contact) throw new Error("pas de bloc contact");
    const cvLinks = within(contact).getAllByRole("link", { name: /^CV / });

    expect(cvLinks.map((link) => link.getAttribute("href"))).toEqual([
      positionings.pm.cvHref,
    ]);
  });
});
