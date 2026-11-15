import { describe, expect, it } from "vitest";

import {
  cases,
  filterCases,
  getCase,
  sortCasesForTrack,
  type CaseStudy,
} from "./cases";

const devOnly: CaseStudy = {
  slug: "dev-only",
  title: { fr: "Dev" },
  summary: { fr: "Dev" },
  tracks: ["dev"],
};
const produitOnly: CaseStudy = {
  slug: "produit-only",
  title: { fr: "Produit" },
  summary: { fr: "Produit" },
  tracks: ["produit"],
};
const both: CaseStudy = {
  slug: "both",
  title: { fr: "Les deux" },
  summary: { fr: "Les deux" },
  tracks: ["dev", "produit"],
};

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

  it("a exactement un fichier MDX français par cas", () => {
    // Glob paresseux : on lit seulement les noms de fichiers, sans les compiler.
    const files = Object.keys(import.meta.glob("./cases/fr/*.mdx"));
    const slugsFromFiles = files.map((path) =>
      path.replace("./cases/fr/", "").replace(".mdx", ""),
    );

    expect(slugsFromFiles.sort()).toEqual(cases.map((c) => c.slug).sort());
  });
});
