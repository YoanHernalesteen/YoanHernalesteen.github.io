import type { CaseBrief } from "~/content/cases";
import type { Focus } from "~/content/positioning";
import type { CareerKind } from "~/content/profile";

// Langues du site. Ajouter "en" ici obligera TypeScript à réclamer
// la traduction partout où un texte est typé `Localized<…>`.
export type Lang = "fr";

// Un texte disponible dans chaque langue du site.
export type Localized<T = string> = Record<Lang, T>;

// Textes communs aux pages de profil (/dev, /produit).
export interface ProfileText {
  metaTitle: string;
  eyebrow: string;
  title: string;
  lede: string;
  cvCta: string;
  casesEyebrow: string;
  casesTitle: string;
  contactTitle: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export interface Dictionary {
  skipToContent: string;
  nav: {
    label: string;
    cases: string;
    career: string;
    contact: string;
  };
  header: {
    // Libellé du bouton CV hors pages de profil.
    cv: string;
    // Libellé du bouton CV sur /dev et /produit.
    cvByFocus: Record<Focus, string>;
    menuOpen: string;
    menuClose: string;
  };
  theme: {
    // Nom de l'interrupteur de thème (activé = sombre).
    dark: string;
  };
  footer: {
    legal: string;
    builtWith: string;
    sourceCode: string;
  };
  home: {
    metaTitle: string;
    // Description courte (Google, LinkedIn) : 160 caractères au plus.
    metaDescription: string;
    eyebrow: string;
    // Lien de l'introduction vers /dev.
    devLink: string;
    careerCredits: string;
    casesEyebrow: string;
    casesTitle: string;
    allCases: string;
    testimonialsLabel: string;
    testimonialsTitle: string;
    allTestimonials: string;
    careerTitle: string;
    careerLede: string;
    careerKinds: Record<CareerKind, string>;
    speedrunEyebrow: string;
    speedrunTitle: string;
    speedrunLede: string;
    // « depuis 2026 » : une fonction, car le texte contient l'année.
    since: (year: number) => string;
    speedrunCase: string;
    contactTitle: string;
    contactLede: string;
  };
  dev: ProfileText & {
    githubCta: string;
    stackEyebrow: string;
    stack: readonly TitledText[];
    strengthsEyebrow: string;
    strengths: readonly TitledText[];
  };
  produit: ProfileText & {
    casesCta: string;
    methodEyebrow: string;
    methodTitle: string;
    method: readonly TitledText[];
    gamesEyebrow: string;
    gamesTitle: string;
    gamesLede: string;
    allCredits: string;
  };
  testimonial: {
    readFull: string;
    hideFull: string;
    translatedFrom: string;
  };
  contact: {
    pdf: string;
  };
  video: {
    // Nom du bouton de lecture : contient le titre de la vidéo.
    play: (title: string) => string;
  };
  cases: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    intro: string;
    filterLabel: string;
    // Libellés des boutons du filtre (les badges des cartes utilisent `tracks`).
    filters: Record<"tous" | "dev" | "produit", string>;
    // Une fonction : le texte dépend du nombre (singulier, pluriel).
    resultCount: (count: number) => string;
    readCase: string;
    back: string;
    next: string;
    brief: { title: string } & Record<keyof CaseBrief, string>;
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
}
