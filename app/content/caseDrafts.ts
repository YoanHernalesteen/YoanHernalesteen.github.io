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
    slug: "gameloft-multi-studios",
    title: {
      fr: "Gameloft : superviser le design de jeux free-to-play dans plusieurs studios",
    },
    summary: {
      fr: "Suivre la direction design de 15 jeux mobiles, du concept présenté à la direction jusqu'aux mises à jour après la sortie.",
    },
    tracks: ["produit"],
    year: { fr: "2014 – 2016" },
    org: "Gameloft",
    tags: { fr: ["Pilotage multi-studios", "Pitch", "Free-to-play"] },
    featured: false,
    brief: {
      fr: {
        role: "Game Content Manager",
        period: "2014 – 2016",
        team: "6 studios internationaux",
        tools: "[outils]",
        shows: "Pilotage de plusieurs équipes, suivi après la sortie",
      },
    },
  },
  {
    slug: "ubisoft-mighty-quest",
    title: {
      fr: "Ubisoft : boucle de jeu, rétention et monétisation d'un RPG mobile",
    },
    summary: {
      fr: "Encadrer plusieurs designers et piloter les systèmes clés de Mighty Quest : boucle de jeu, progression, événements, boutique.",
    },
    tracks: ["produit"],
    year: { fr: "2016 – 2019" },
    org: "Ubisoft",
    tags: { fr: ["Rétention", "Monétisation", "Encadrement"] },
    featured: false,
    brief: {
      fr: {
        role: "Senior Game Designer",
        period: "2016 – 2019",
        team: "[taille et rôles de l'équipe]",
        tools: "[outils]",
        shows: "Encadrement, systèmes de rétention et de monétisation",
      },
    },
  },
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
