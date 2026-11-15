import type { Focus } from "~/content/positioning";

// Langues du site. Ajouter "en" ici obligera TypeScript à réclamer
// la traduction partout où un texte est typé `Localized<…>`.
export type Lang = "fr";

// Un texte disponible dans chaque langue du site.
// `Record<Lang, T>` = un objet avec une clé par langue, chacune de type T.
export type Localized<T = string> = Record<Lang, T>;

export interface PositioningText {
  role: string;
  headline: string;
  cvLabel: string;
  skills: readonly string[];
}

export interface Dictionary {
  skipToContent: string;
  nav: {
    label: string;
    home: string;
    cases: string;
    about: string;
    contact: string;
  };
  footer: {
    legal: string;
  };
  home: {
    contactCta: string;
    skillsTitle: string;
    casesTitle: string;
    allCases: string;
    careerTitle: string;
  };
  cases: {
    title: string;
    intro: string;
    filterLabel: string;
    back: string;
  };
  tracks: {
    tous: string;
    dev: string;
    produit: string;
  };
  notFound: {
    title: string;
    text: string;
    back: string;
  };
  error: {
    title: string;
    text: string;
  };
  // Un texte par angle : impossible d'oublier un angle, TypeScript le signale.
  positioning: Record<Focus, PositioningText>;
}
