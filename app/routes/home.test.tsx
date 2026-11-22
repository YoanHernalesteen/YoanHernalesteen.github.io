import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases, featuredCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { career, games } from "~/content/profile";
import { site } from "~/content/site";
import { speedrunActivities } from "~/content/speedrun";
import { testimonialsFor } from "~/content/testimonials";
import { t } from "~/i18n";

import Home, { meta } from "./home";

function renderHome() {
  const Stub = createRoutesStub([{ path: "/", Component: Home }]);
  render(<Stub />);
}

describe("Home", () => {
  it("a un seul titre principal", () => {
    renderHome();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
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

  it("propose sous l'introduction le CV, les études de cas et le profil développeur", () => {
    renderHome();

    const hero = screen.getByRole("heading", { level: 1 }).closest("section");
    if (!hero) throw new Error("introduction introuvable");
    const hrefs = within(hero)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href") ?? "");

    expect(hrefs).toContain(positionings.pm.cvHref);
    expect(hrefs).toContain("/dev");
    // Le lien vers les études de cas vise bien la section des cas.
    const anchor = hrefs.find((href) => href.startsWith("#")) ?? "";
    const target = document.getElementById(anchor.slice(1));
    if (!target) throw new Error(`cible introuvable : ${anchor}`);
    expect(target.querySelector('a[href^="/cas/"]')).not.toBeNull();
  });

  it("met en avant les études de cas choisies, celles de l'angle actif d'abord", () => {
    renderHome();

    const section = document.getElementById("etudes-de-cas");
    if (!section) throw new Error("section des études de cas introuvable");
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
      name: `${t.home.testimonialsLabel} ${t.home.testimonialsTitle}`,
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
    for (const step of career) {
      expect(
        within(timeline).getByText(
          `${t.home.careerKinds[step.kind]} · ${step.period.fr}`,
        ),
      ).toBeInTheDocument();
    }
  });

  it("montre les jeux choisis et renvoie vers la liste complète", () => {
    renderHome();

    const link = document.querySelector('a[href="/cas#jeux"]');
    const section = link?.closest("section");
    if (!section) throw new Error("section des jeux introuvable");

    expect(
      within(section)
        .getAllByRole("heading", { level: 3 })
        .map((h) => h.textContent),
    ).toEqual(
      games.filter((game) => game.highlighted).map((game) => game.title),
    );
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

  it("présente les activités speedrun, avec leurs liens et des logos décoratifs", () => {
    renderHome();

    const section = screen.getByRole("region", {
      name: `${t.home.speedrunEyebrow} ${t.home.speedrunTitle}`,
    });
    for (const activity of speedrunActivities) {
      expect(
        within(section).getByRole("heading", { level: 3, name: activity.name }),
      ).toBeInTheDocument();
      for (const link of activity.links ?? []) {
        const element = within(section).getByRole("link", { name: link.label });
        expect(element).toHaveAttribute("href", link.href);
        expect(element.querySelector("svg")).toHaveAttribute(
          "aria-hidden",
          "true",
        );
      }
      if (activity.caseSlug) {
        expect(
          within(section).getByRole("link", { name: /étude de cas/ }),
        ).toHaveAttribute("href", `/cas/${activity.caseSlug}`);
      }
    }
    for (const article of within(section).getAllByRole("article")) {
      // Logo décoratif : l'événement est déjà nommé dans le texte.
      expect(article.querySelector("img")).toHaveAttribute("alt", "");
    }
  });

  it("montre LinkedIn et GitHub dans le contact, avec une icône décorative", () => {
    renderHome();

    const contact = document.getElementById("contact");
    if (!contact) throw new Error("pas de bloc contact");
    for (const href of [site.linkedin, site.github]) {
      const link = contact.querySelector(`a[href="${href}"]`);
      expect(link?.querySelector("svg"), href).toHaveAttribute(
        "aria-hidden",
        "true",
      );
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
