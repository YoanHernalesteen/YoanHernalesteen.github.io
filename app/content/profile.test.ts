import { describe, expect, it } from "vitest";

import { career, games, stats } from "./profile";
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

  it("se termine par le poste actuel", () => {
    expect(career.at(-1)?.current).toBe(true);
    expect(career.filter((step) => step.current)).toHaveLength(1);
  });
});

describe("les chiffres clés", () => {
  it("ont une valeur et une légende", () => {
    expect(stats.length).toBeGreaterThan(0);
    for (const stat of stats) {
      expect(stat.value.trim()).not.toBe("");
      expect(stat.label.fr.trim()).not.toBe("");
    }
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
