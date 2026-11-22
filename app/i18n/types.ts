import type { CaseBrief } from "~/content/cases";
import type { Focus } from "~/content/positioning";
import type { GameloftRole } from "~/content/gameloft";
import type { CareerKind } from "~/content/profile";

// Langues du site. Ajouter "en" ici obligera TypeScript à réclamer
// la traduction partout où un texte est typé `Localized<…>`.
export type Lang = "fr";

// Un texte disponible dans chaque langue du site.
export type Localized<T = string> = Record<Lang, T>;

export interface TitledText {
  title: string;
  text: string;
}

export interface Dictionary {
  skipToContent: string;
  // Texte alternatif de l'image d'aperçu des réseaux sociaux.
  ogImageAlt: string;
  nav: {
    label: string;
    cases: string;
    career: string;
    contact: string;
  };
  header: {
    // Libellé du bouton CV de l'en-tête.
    cv: string;
    // Nom de chaque CV dans le bloc contact.
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
  dev: {
    metaTitle: string;
    eyebrow: string;
    title: string;
    lede: string;
    cvCta: string;
    casesEyebrow: string;
    casesTitle: string;
    contactTitle: string;
    githubCta: string;
    stackEyebrow: string;
    stack: readonly TitledText[];
    strengthsEyebrow: string;
    strengths: readonly TitledText[];
  };
  // Le profil produit, affiché sur l'accueil.
  produit: {
    title: string;
    lede: string;
    cvCta: string;
    casesCta: string;
    methodEyebrow: string;
    methodTitle: string;
    method: readonly TitledText[];
  };
  // Les jeux suivis chez Gameloft (étude de cas).
  gameloft: {
    roles: Record<GameloftRole, string>;
    googlePlay: string;
    appStore: string;
    // Une fonction : le texte contient la tranche (« 500 M+ »).
    downloads: (range: string) => string;
    // Note lue par les lecteurs d'écran (« 4,4 sur 5 »).
    ratingLabel: (rating: string) => string;
  };
  games: {
    eyebrow: string;
    title: string;
    lede: string;
    allCredits: string;
    // Titre de la sélection de l'accueil.
    highlightTitle: string;
    // Lien de l'accueil vers la liste complète.
    allGames: string;
  };
  testimonial: {
    readFull: string;
    hideFull: string;
    translatedFrom: string;
  };
  contact: {
    availability: string;
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
    // Titre de la liste, lu par les lecteurs d'écran.
    listTitle: string;
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
