import type { CaseStudy } from "./cases";

// Études de cas en cours d'écriture, masquées du site.
// Ce fichier n'est importé par aucune page, seulement par les tests : rien
// de ce qu'il contient ne part en ligne. Le texte de chaque brouillon est
// dans app/content/cases/brouillons/<slug>.mdx.
//
// Pour publier un brouillon : déplacer sa fiche dans `cases` (cases.ts) et
// son fichier MDX de brouillons/ vers fr/. Les tests vérifient les deux.
export const draftCases: readonly CaseStudy[] = [
  {
    slug: "ce-portfolio",
    title: { fr: "Ce portfolio : un site React typé, testé et accessible" },
    summary: {
      fr: "Composants en TypeScript, tests, intégration et déploiement continus, accessibilité.",
    },
    tracks: ["dev"],
    year: { fr: "2026" },
    org: "Projet personnel",
    tags: { fr: ["TypeScript", "Vitest", "GitHub Actions"] },
    featured: false,
    brief: {
      fr: {
        role: "Conception et développement",
        period: "2026",
        team: "Seul",
        tools: "React, TypeScript, React Router, Vitest, GitHub Actions",
        shows:
          "TypeScript strict, tests, intégration et déploiement continus, accessibilité",
      },
    },
  },
];
