import type { Localized } from "~/i18n/types";

export type Track = "dev" | "produit";
export type TrackFilter = Track | "tous";

// Les métadonnées vivent ici, typées. Le texte de chaque cas vit dans
// app/content/cases/<langue>/<slug>.mdx (un test vérifie la correspondance).
export interface CaseStudy {
  slug: string;
  title: Localized;
  summary: Localized;
  tracks: readonly Track[];
}

export const cases: readonly CaseStudy[] = [
  {
    slug: "media-trackr",
    title: { fr: "Media Trackr : 3 API et un chatbot IA en 2 semaines, à 3" },
    summary: {
      fr: "Une app pour suivre films, jeux et livres, avec OMDb, IGDB, Open Library et l'API OpenAI.",
    },
    tracks: ["dev"],
  },
  {
    slug: "the-rolistes",
    title: {
      fr: "The Rolistes : faire vivre le site d'un podcast depuis 2021",
    },
    summary: {
      fr: "Un site maintenu dans la durée, migré de React vers Next.js en 2023.",
    },
    tracks: ["dev", "produit"],
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
