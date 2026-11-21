import jusantCover from "~/assets/cases/dont-nod-jusant-accessibilite/escalade.webp";
import elliiRefonteCover from "~/assets/cases/ellii-refonte-tests-seniors/cover.webp";
import elliiRecommandationCover from "~/assets/cases/ellii-recommandation-ateliers/cover.webp";
import jppCover from "~/assets/cases/jpp-speedrun/logo.webp";
import mediaTrackrCover from "~/assets/cases/media-trackr/cover.webp";
import rolistesCover from "~/assets/cases/the-rolistes/cover.webp";
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
  // `credit` : mention de copyright affichée sous l'image (« © Don't Nod »).
  cover?: { src: string; alt: Localized; credit?: string };
}

// Les études de cas affichées sur le site. Les brouillons sont à part, dans
// caseDrafts.ts : aucune page ne l'importe, ils ne partent donc pas en ligne.
export const cases: readonly CaseStudy[] = [
  {
    // Fusion des anciens cas « tests avec 12 seniors » et « feature de la
    // refonte » : les tests ont servi à valider la refonte.
    slug: "ellii-refonte-tests-seniors",
    title: {
      fr: "Ellii : refondre l'application et la valider avec 12 seniors",
    },
    summary: {
      fr: "Construire une partie des pages publiques de la refonte, la valider auprès de 12 membres seniors, puis relancer les membres avec Customer.io : abandons au paiement passés de 23 % à 15 %, absences aux ateliers divisées par 2.",
    },
    tracks: ["dev", "produit"],
    year: { fr: "2026" },
    org: "Ellii",
    tags: { fr: ["Ruby on Rails", "Tests utilisateurs", "PostHog"] },
    featured: true,
    cover: {
      src: elliiRefonteCover,
      alt: {
        fr: "L'accueil du nouveau site Ellii : le slogan « Le plaisir d'être ensemble, la liberté d'être chez soi » sur une photo de yoga, et les chiffres clés.",
      },
    },
    brief: {
      fr: {
        role: "Développeur full-stack : pages publiques de la refonte (accueil, pages partenaires, FAQ, navigation), protocole de test, conduite des 12 tests, synthèse et recommandations, participation au plan de suivi PostHog, campagnes Customer.io, mesure de l'impact",
        period:
          "2026 · avril → novembre (refonte mise en ligne début septembre)",
        team: "CTO, développeur front",
        tools:
          "Ruby on Rails, RSpec, Hotwire (Turbo/Stimulus), ViewComponent, Tailwind, Figma, PostHog, Customer.io",
        shows:
          "Recherche utilisateur, décisions produit, développement front et back, mesure de l'impact avec PostHog, relance des membres avec Customer.io",
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
      fr: "Prévoir, avant de publier une séance, son risque d'annulation et le nombre de participants attendus, pour aider l'équipe à construire le planning : +38 % de réservations sur les premières semaines, hors effet de la refonte.",
    },
    tracks: ["dev", "produit"],
    year: { fr: "2026" },
    org: "Ellii",
    tags: {
      fr: ["Ruby on Rails", "Modèle de prévision", "Aide à la décision"],
    },
    featured: true,
    cover: {
      src: elliiRecommandationCover,
      alt: {
        fr: "L'onglet Diagnostic de l'outil : pour chaque atelier, le risque d'annulation, les inscrits et présents attendus, le rythme récent et la tendance.",
      },
    },
    brief: {
      fr: {
        role: "Développeur full-stack : analyse des données, conception et validation du modèle de prévision, intégration dans l'application (back, front, tests), propositions de planning",
        period: "2026 · environ 2 mois (fin septembre → novembre)",
        team: "Moi + le CTO (revue du code et des choix)",
        tools:
          "Ruby on Rails, Minitest, Turbo/Stimulus, PostgreSQL, Solid Cache, PostHog, Linear",
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
    tracks: ["dev", "produit"],
    year: { fr: "2025" },
    org: "Le Wagon",
    tags: { fr: ["Ruby on Rails", "Conception produit", "OpenAI"] },
    featured: false,
    cover: {
      src: mediaTrackrCover,
      alt: {
        fr: "L'app Media Trackr : son logo et trois œuvres suivies, le film Dune, le livre Le Seigneur des Anneaux et le jeu Zelda: Tears of the Kingdom.",
      },
    },
    brief: {
      fr: {
        role: "Porteur du concept et lead technique (back-end, API et chatbot IA)",
        period: "Décembre 2025 · 2 semaines, puis évolutions en solo",
        team: "3 développeurs",
        tools:
          "Ruby on Rails, Hotwire, OMDb, IGDB, Open Library, OpenAI (ruby_llm), Heroku",
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
    cover: {
      src: rolistesCover,
      alt: {
        fr: "L'accueil du site The Rolistes : le menu, une annonce, la grande illustration du podcast en noir et blanc et les derniers épisodes.",
      },
      credit: "Illustration © The Rolistes",
    },
    brief: {
      fr: {
        role: "Développeur pour un client : cadrage, direction artistique définie avec le client, développement, déploiement et maintenance",
        period: "Depuis 2021",
        team: "1 développeur (moi), avec la personne qui anime le podcast comme client (contenu et validation de la direction artistique)",
        tools: "React, Next.js, TypeScript, Vitest, GitHub Actions",
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
    featured: true,
    cover: {
      src: jusantCover,
      alt: {
        fr: "Jusant : le personnage grimpe sous un surplomb rocheux, encordé, au-dessus d'une mer de nuages.",
      },
      credit: "© Don't Nod",
    },
    brief: {
      fr: {
        role: "Game et level designer : options d'accessibilité liées aux contrôles, contrôles clavier et souris",
        period:
          "3 ans de projet, dont 6 mois sur l'accessibilité · sortie en 2023",
        team: "Une trentaine de personnes en moyenne",
        tools: "Unreal Engine 5",
        shows:
          "Accessibilité, conception à partir des difficultés des joueurs, options de jeu",
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
    cover: {
      src: jppCover,
      alt: { fr: "Le logo de JPP Speedrun, en lettres découpées." },
    },
    brief: {
      fr: {
        role: "Cofondateur : processus de diffusion, formulaires de soumission, lien avec les restreams, revue des soumissions, planning",
        period: "Depuis 2026 · 2 événements par an",
        team: "5 cofondateurs : direction artistique, communication, Discord, modération ; tous participent à la revue des soumissions et au planning",
        tools: "Twitch, YouTube, Bluesky, Discord, CryptPad",
        shows:
          "Pilotage d'un projet à date fixe, coordination de bénévoles, décisions en direct",
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
