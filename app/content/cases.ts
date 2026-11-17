import mediaTrackrCover from "~/assets/cases/media-trackr/cover.webp";
import type { Localized } from "~/i18n/types";

export type Track = "dev" | "produit";
export type TrackFilter = Track | "tous";

// Encadré « En bref » de la page d'un cas.
export interface CaseBrief {
  role: string;
  period: string;
  team: string;
  tools: string;
  shows: string;
}

// Les métadonnées vivent ici, typées. Le texte de chaque cas vit dans
// app/content/cases/<langue>/<slug>.mdx (un test vérifie la correspondance).
// Les valeurs entre crochets [ ] sont à compléter.
export interface CaseStudy {
  slug: string;
  title: Localized;
  summary: Localized;
  tracks: readonly Track[];
  // Texte libre : « 2026 », « 2016 – 2019 », « 2021 – aujourd'hui ».
  year: Localized;
  // Entreprise ou projet, affiché en petites capitales.
  org: string;
  // Mots-clés affichés sur la carte.
  tags: Localized<readonly string[]>;
  // Affiché sur l'accueil.
  featured: boolean;
  brief: Localized<CaseBrief>;
  // Visuel facultatif : sans lui, la carte et la page s'affichent sans image.
  // `src` vient d'un import d'image placée dans app/assets/cases/<slug>/,
  // par exemple : import mediaTrackrCover from "~/assets/cases/media-trackr/cover.webp";
  cover?: { src: string; alt: Localized };
}

export const cases: readonly CaseStudy[] = [
  {
    // Fusion des anciens cas « tests avec 12 seniors » et « feature de la
    // refonte » : les tests ont servi à valider la refonte.
    slug: "ellii-refonte-tests-seniors",
    title: {
      fr: "Ellii : refondre l'application et la valider avec 12 seniors",
    },
    summary: {
      fr: "Développer la refonte complète de l'application, puis la tester auprès de 12 seniors pour la valider et l'améliorer.",
    },
    tracks: ["dev", "produit"],
    year: { fr: "2026" },
    org: "Ellii",
    tags: { fr: ["Ruby on Rails", "Tests utilisateurs", "PostHog"] },
    featured: true,
    brief: {
      fr: {
        role: "Développeur full-stack : [partie de la refonte développée], organisation des tests, synthèse, propositions d'améliorations",
        period: "2026 · [durée]",
        team: "[taille et rôles de l'équipe]",
        tools: "Ruby on Rails, RSpec, Sidekiq, PostHog, [autres outils]",
        shows:
          "Recherche utilisateur, décisions produit, développement front et back, mesure",
      },
    },
  },
  {
    // Ne montrer aucun nom ni classement d'animateurs : décrire la méthode.
    slug: "ellii-recommandation-ateliers",
    title: {
      fr: "Ellii : recommander les ateliers à programmer à partir des données",
    },
    summary: {
      fr: "Concevoir et développer un algorithme qui estime le remplissage des ateliers et les meilleurs créneaux, pour recommander à l'équipe les ateliers à proposer.",
    },
    tracks: ["dev", "produit"],
    year: { fr: "2026" },
    org: "Ellii",
    tags: { fr: ["Données d'usage", "Aide à la décision", "Back-office"] },
    featured: true,
    brief: {
      fr: {
        role: "Conception et développement, sur un chantier jusque-là délaissé",
        period: "2026 · [durée]",
        team: "[taille et rôles de l'équipe]",
        tools: "[outils et technologies]",
        shows:
          "Analyse de données, décision produit, développement d'un outil interne",
      },
    },
  },
  {
    slug: "media-trackr",
    title: { fr: "Media Trackr : 3 API et un chatbot IA en 2 semaines, à 3" },
    summary: {
      fr: "Une app Rails qui centralise films, jeux et livres, avec des recommandations par IA.",
    },
    tracks: ["dev"],
    year: { fr: "2025" },
    org: "Le Wagon",
    tags: { fr: ["Ruby on Rails", "OMDb, IGDB, Open Library", "OpenAI"] },
    featured: false,
    cover: {
      src: mediaTrackrCover,
      alt: {
        fr: "L'app Media Trackr : son logo et trois œuvres suivies, le film Dune, le livre Le Seigneur des Anneaux et le jeu Zelda: Tears of the Kingdom.",
      },
    },
    brief: {
      fr: {
        role: "[ton rôle dans l'équipe]",
        period: "2025 · 2 semaines",
        team: "3 développeurs",
        tools: "Ruby on Rails, OMDb, IGDB, Open Library, API OpenAI",
        shows: "Intégration d'API, travail d'équipe, livraison rapide",
      },
    },
  },
  {
    slug: "the-rolistes",
    title: {
      fr: "The Rolistes : faire évoluer le site d'un podcast depuis 2021",
    },
    summary: {
      fr: "Concevoir et maintenir le site d'un podcast de plus de 60 épisodes, passé de React à Next.js en 2023.",
    },
    tracks: ["dev", "produit"],
    year: { fr: "2021 – aujourd'hui" },
    org: "The Rolistes",
    tags: { fr: ["React", "Next.js", "Maintenance"] },
    featured: false,
    brief: {
      fr: {
        role: "[ton rôle]",
        period: "Depuis 2021",
        team: "[taille de l'équipe]",
        tools: "React, Next.js",
        shows: "Un site maintenu dans la durée, une migration technique",
      },
    },
  },
  {
    // Uniquement des éléments publics : le jeu sorti, ses menus, la presse.
    slug: "dont-nod-jusant-accessibilite",
    title: {
      fr: "Don't Nod · Jusant : rendre l'escalade accessible en simplifiant les contrôles",
    },
    summary: {
      fr: "Les contrôles d'escalade demandaient d'alterner et de maintenir les gâchettes en continu, avec un système d'endurance exigeant. Des options d'accessibilité ont ouvert le jeu aux joueurs qui ne pouvaient pas suivre ce rythme.",
    },
    tracks: ["produit"],
    year: { fr: "2023" },
    org: "Don't Nod",
    tags: { fr: ["Accessibilité", "Tests utilisateurs", "Unreal Engine 5"] },
    featured: false,
    brief: {
      fr: {
        role: "Level designer : options d'accessibilité liées aux contrôles, contrôles clavier et souris",
        period: "6 mois, autour de la sortie en 2023",
        team: "[taille et rôles de l'équipe]",
        tools: "Unreal Engine 5, [autres outils]",
        shows:
          "Accessibilité, conception à partir des difficultés des joueurs, options de jeu",
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
    featured: true,
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
    slug: "jpp-speedrun",
    title: {
      fr: "JPP Speedrun : cofonder et organiser des marathons de speedrun en direct",
    },
    summary: {
      fr: "Cofonder un événement de speedrun francophone et en organiser deux éditions par an : programmation, coordination de l'équipe et supervision technique de la diffusion.",
    },
    tracks: ["produit"],
    year: { fr: "Depuis 2026" },
    org: "JPP Speedrun",
    tags: {
      fr: [
        "Organisation d'événements",
        "Coordination d'équipe",
        "Diffusion en direct",
      ],
    },
    featured: false,
    brief: {
      fr: {
        role: "Cofondateur : programmation, coordination de l'équipe, supervision technique",
        period: "Depuis 2026 · 2 événements par an",
        team: "[taille et rôles de l'équipe]",
        tools: "[outils de diffusion et d'organisation]",
        shows:
          "Pilotage d'un projet à date fixe, coordination de bénévoles, décisions en direct",
      },
    },
  },
  {
    slug: "ce-portfolio",
    title: { fr: "Ce portfolio : un site React typé, testé et accessible" },
    summary: {
      fr: "Composants en TypeScript, tests, intégration continue, accessibilité et performances mesurées avec Lighthouse.",
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
        shows: "TypeScript strict, tests, CI, accessibilité",
      },
    },
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function filterCases(
  list: readonly CaseStudy[],
  filter: TrackFilter,
): readonly CaseStudy[] {
  if (filter === "tous") return list;
  return list.filter((c) => c.tracks.includes(filter));
}

// Les cas de la piste demandée d'abord, les autres ensuite.
// Array.prototype.sort est stable : l'ordre d'origine est conservé dans chaque groupe.
export function sortCasesForTrack(
  list: readonly CaseStudy[],
  track: Track,
): CaseStudy[] {
  const rank = (c: CaseStudy) => (c.tracks.includes(track) ? 0 : 1);
  return [...list].sort((a, b) => rank(a) - rank(b));
}

// Les cas mis en avant sur l'accueil, ceux de la piste demandée d'abord.
export function featuredCases(
  list: readonly CaseStudy[],
  track: Track,
): CaseStudy[] {
  return sortCasesForTrack(
    list.filter((c) => c.featured),
    track,
  );
}

// Le cas qui suit dans la liste, en revenant au premier après le dernier.
export function nextCase(
  list: readonly CaseStudy[],
  slug: string,
): CaseStudy | undefined {
  const index = list.findIndex((c) => c.slug === slug);
  if (index === -1 || list.length < 2) return undefined;
  return list[(index + 1) % list.length];
}
