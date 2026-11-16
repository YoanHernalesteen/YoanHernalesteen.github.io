import type { CaseStudy } from "~/content/cases";

// Fabrique un cas de test : seuls les champs utiles au test sont précisés.
// Partial<CaseStudy> = le même type, avec tous les champs optionnels.
export function makeCase(overrides: Partial<CaseStudy>): CaseStudy {
  return {
    slug: "cas",
    title: { fr: "Titre" },
    summary: { fr: "Résumé" },
    tracks: ["dev"],
    year: { fr: "2026" },
    org: "Org",
    tags: { fr: ["Tag"] },
    featured: false,
    brief: {
      fr: {
        role: "Rôle",
        period: "2026",
        team: "3",
        tools: "Rails",
        shows: "…",
      },
    },
    ...overrides,
  };
}
