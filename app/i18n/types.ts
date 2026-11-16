import type { Focus } from "~/content/positioning";

// Langues du site. Ajouter "en" ici obligera TypeScript à réclamer
// la traduction partout où un texte est typé `Localized<…>`.
export type Lang = "fr";

// Un texte disponible dans chaque langue du site.
// `Record<Lang, T>` = un objet avec une clé par langue, chacune de type T.
export type Localized<T = string> = Record<Lang, T>;

// Une porte de l'accueil (« Je recrute un développeur »…).
export interface DoorText {
  eyebrow: string;
  title: string;
  text: string;
  chips: readonly string[];
  cta: string;
}

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
    label: string;
    system: string;
    light: string;
    dark: string;
  };
  footer: {
    legal: string;
    builtWith: string;
    sourceCode: string;
  };
  home: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lede: string;
    doorsEyebrow: string;
    doorsLabel: string;
    statsLabel: string;
    casesEyebrow: string;
    casesTitle: string;
    allCases: string;
    testimonialsLabel: string;
    testimonialsTitle: string;
    allTestimonials: string;
    careerTitle: string;
    careerLede: string;
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
    translatedFrom: string;
    original: string;
  };
  contact: {
    pdf: string;
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
    coverPlaceholder: string;
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
  // Une porte par angle : impossible d'oublier un angle, TypeScript le signale.
  doors: Record<Focus, DoorText>;
}
