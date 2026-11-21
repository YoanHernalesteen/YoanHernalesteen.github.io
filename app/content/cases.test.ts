import { describe, expect, it } from "vitest";

import {
  cases,
  featuredCases,
  filterCases,
  getCase,
  nextCase,
  sortCasesForTrack,
} from "./cases";

import { makeCase } from "~/test/makeCase";

import { draftCases } from "./caseDrafts";

const devOnly = makeCase({ slug: "dev-only", tracks: ["dev"] });
const produitOnly = makeCase({ slug: "produit-only", tracks: ["produit"] });
const both = makeCase({ slug: "both", tracks: ["dev", "produit"] });

describe("nextCase", () => {
  const list = [
    makeCase({ slug: "a" }),
    makeCase({ slug: "b" }),
    makeCase({ slug: "c" }),
  ];

  it("renvoie le cas suivant dans la liste", () => {
    expect(nextCase(list, "a")?.slug).toBe("b");
  });

  it("revient au premier après le dernier", () => {
    expect(nextCase(list, "c")?.slug).toBe("a");
  });

  it("renvoie undefined pour un slug inconnu ou une liste d'un seul cas", () => {
    expect(nextCase(list, "inconnu")).toBeUndefined();
    expect(nextCase([makeCase({ slug: "seul" })], "seul")).toBeUndefined();
  });
});

describe("featuredCases", () => {
  it("ne garde que les cas mis en avant, ceux de la piste demandée d'abord", () => {
    const list = [
      makeCase({ slug: "a", tracks: ["dev"], featured: true }),
      makeCase({ slug: "b", tracks: ["produit"], featured: false }),
      makeCase({ slug: "c", tracks: ["produit"], featured: true }),
    ];

    expect(featuredCases(list, "produit").map((c) => c.slug)).toEqual([
      "c",
      "a",
    ]);
  });
});

describe("sortCasesForTrack", () => {
  it("place d'abord les cas de la piste demandée, sans changer leur ordre", () => {
    const list = [devOnly, produitOnly, both];

    expect(sortCasesForTrack(list, "produit").map((c) => c.slug)).toEqual([
      "produit-only",
      "both",
      "dev-only",
    ]);
  });

  it("ne modifie pas la liste d'origine", () => {
    const list = [devOnly, produitOnly];

    sortCasesForTrack(list, "produit");

    expect(list).toEqual([devOnly, produitOnly]);
  });
});

describe("filterCases", () => {
  const list = [devOnly, produitOnly, both];

  it("renvoie tous les cas avec le filtre « tous »", () => {
    expect(filterCases(list, "tous")).toEqual(list);
  });

  it("ne garde que les cas de la piste choisie", () => {
    expect(filterCases(list, "dev")).toEqual([devOnly, both]);
  });
});

describe("getCase", () => {
  it("trouve un cas par son slug", () => {
    const first = cases[0];

    expect(getCase(first.slug)).toBe(first);
  });

  it("renvoie undefined pour un slug inconnu", () => {
    expect(getCase("inconnu")).toBeUndefined();
  });
});

describe("la liste des études de cas", () => {
  it("a des slugs uniques au format kebab-case", () => {
    const slugs = cases.map((c) => c.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("donne à chaque cas une année, des mots-clés et un encadré complet", () => {
    for (const c of cases) {
      expect(c.year.fr.trim(), c.slug).not.toBe("");
      expect(c.tags.fr.length, c.slug).toBeGreaterThan(0);
      for (const value of Object.values(c.brief.fr)) {
        expect(value.trim(), c.slug).not.toBe("");
      }
    }
  });

  it("donne un texte alternatif à chaque visuel", () => {
    for (const c of cases) {
      if (c.cover) expect(c.cover.alt.fr.trim(), c.slug).not.toBe("");
    }
  });

  it("a exactement un fichier MDX français par cas", () => {
    // Glob paresseux : on lit seulement les noms de fichiers, sans les compiler.
    const files = Object.keys(import.meta.glob("./cases/fr/*.mdx"));
    const slugsFromFiles = files.map((path) =>
      path.replace("./cases/fr/", "").replace(".mdx", ""),
    );

    expect(slugsFromFiles.sort()).toEqual(cases.map((c) => c.slug).sort());
  });
});

describe("les brouillons", () => {
  it("ne font pas partie des études de cas publiées", () => {
    expect(draftCases.length).toBeGreaterThan(0);
    for (const draft of draftCases) {
      expect(cases.map((c) => c.slug)).not.toContain(draft.slug);
      expect(getCase(draft.slug)).toBeUndefined();
    }
  });

  it("ont leur texte dans brouillons/, hors des pages générées", () => {
    // Le build ne génère que les pages des fichiers de cases/fr/.
    const files = Object.keys(import.meta.glob("./cases/brouillons/*.mdx"));
    const slugsFromFiles = files.map((path) =>
      path.replace("./cases/brouillons/", "").replace(".mdx", ""),
    );

    expect(slugsFromFiles.sort()).toEqual(draftCases.map((c) => c.slug).sort());
  });
});
