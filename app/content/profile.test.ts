import { describe, expect, it } from "vitest";

import { career, games, gamesNewestFirst } from "./profile";
import {
  TESTIMONIAL_PAGES,
  testimonials,
  testimonialsFor,
} from "./testimonials";

describe("le parcours", () => {
  it("est trié du plus ancien au plus récent", () => {
    const years = career.map((step) => step.startYear);

    expect(years).toEqual([...years].sort((a, b) => a - b));
  });

  it("indique pour chaque étape s'il s'agit d'une formation ou d'un poste", () => {
    for (const step of career) {
      expect(["formation", "poste"]).toContain(step.kind);
    }
    // Les formations : bachelier, master, puis bootcamp Le Wagon.
    expect(
      career
        .filter((step) => step.kind === "formation")
        .map((s) => s.startYear),
    ).toEqual([2004, 2007, 2025]);
  });

  it("se termine par le poste actuel", () => {
    expect(career.at(-1)?.current).toBe(true);
    expect(career.at(-1)?.kind).toBe("poste");
    expect(career.filter((step) => step.current)).toHaveLength(1);
  });
});

describe("les jeux livrés", () => {
  it("ont un titre, une ligne d'informations et un rôle", () => {
    expect(games.length).toBeGreaterThan(0);
    for (const game of games) {
      expect(game.title.trim()).not.toBe("");
      expect(game.meta.fr.trim()).not.toBe("");
      expect(game.role.fr.trim()).not.toBe("");
    }
  });

  it("donnent à chaque visuel un texte alternatif et un copyright", () => {
    for (const game of games) {
      if (!game.image) continue;
      expect(game.image.alt.fr.trim(), game.title).not.toBe("");
      expect(game.image.credit, game.title).toMatch(/^© /);
    }
  });

  it("se trient du plus récent au plus ancien", () => {
    const years = gamesNewestFirst(games).map((game) => game.year);

    expect(years).toEqual([...years].sort((a, b) => b - a));
    expect(gamesNewestFirst(games)[0].title).toBe(
      "Banishers: Ghosts of New Eden",
    );
  });

  it("ne modifient pas la liste d'origine en la triant", () => {
    const before = games.map((game) => game.title);

    gamesNewestFirst(games);

    expect(games.map((game) => game.title)).toEqual(before);
  });
});

describe("les recommandations", () => {
  it.each(TESTIMONIAL_PAGES)("la page « %s » en a au moins une", (page) => {
    expect(testimonialsFor(page).length).toBeGreaterThan(0);
  });

  it("n'affichent que le poste et l'entreprise, jamais le nom", () => {
    const allowed = [
      "role",
      "relation",
      "paragraphs",
      "translatedFrom",
      "original",
      "highlights",
    ];

    for (const testimonial of testimonials) {
      expect(
        Object.keys(testimonial).every((key) => allowed.includes(key)),
      ).toBe(true);
    }
  });

  it("mettent en avant des phrases tirées mot pour mot du texte complet", () => {
    for (const testimonial of testimonials) {
      const fullText = testimonial.paragraphs.fr.join(" ");

      for (const highlight of Object.values(testimonial.highlights)) {
        expect(fullText).toContain(highlight.fr);
      }
    }
  });

  it("gardent l'original quand elles sont traduites", () => {
    for (const testimonial of testimonials) {
      if (testimonial.original) {
        expect(testimonial.translatedFrom).toBeDefined();
      }
    }
  });

  it("renvoient pour chaque page la phrase mise en avant", () => {
    for (const page of TESTIMONIAL_PAGES) {
      for (const { testimonial, highlight } of testimonialsFor(page)) {
        expect(highlight).toBe(testimonial.highlights[page]);
      }
    }
  });
});
