import type { Dictionary } from "./types";

export const fr = {
  skipToContent: "Aller au contenu",
  nav: {
    label: "Navigation principale",
    cases: "Études de cas",
    career: "Parcours",
    contact: "Contact",
  },
  header: {
    cv: "Télécharger mon CV",
    cvByFocus: {
      "dev-produit": "CV développeur",
      po: "CV Product Owner",
    },
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
  },
  theme: {
    label: "Thème",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
  },
  footer: {
    legal: "Mentions légales",
    builtWith: "Codé en React + TypeScript",
    sourceCode: "code source",
  },
  home: {
    metaTitle: "Conception produit et développement Ruby on Rails",
    eyebrow: "Conception produit · Développement Ruby on Rails",
    title: "Je conçois et je code des produits web.",
    // TODO : « 16 ans » ou « 17 ans » ? La frise va de 2008 à 2025.
    lede: "Pendant 16 ans, j'ai conçu des jeux vidéo chez Ubisoft, Gameloft, Don't Nod et Ninja Theory : specs, priorisation, Scrum. Aujourd'hui, je développe en Ruby on Rails chez Ellii, avec le même réflexe : partir de l'utilisateur.",
    doorsEyebrow: "Deux façons de lire mon profil",
    doorsLabel: "Choisir un profil",
    statsLabel: "En chiffres",
    casesEyebrow: "Études de cas",
    casesTitle: "Ce que j'ai conçu et livré",
    allCases: "Toutes les études de cas →",
    testimonialsLabel: "Recommandations",
    testimonialsTitle: "Ils ont travaillé avec moi",
    allTestimonials: "Toutes mes recommandations sur LinkedIn →",
    careerTitle: "Du game design au code",
    careerLede:
      "Le fil rouge : concevoir pour des utilisateurs, piloter des features de bout en bout et travailler en Scrum.",
    contactTitle: "Un poste à pourvoir ? Parlons-en.",
    contactLede:
      "Basé à Issy-les-Moulineaux. Ouvert à l'Île-de-France, à Lille, à la Belgique et au télétravail.",
  },
  testimonial: {
    readFull: "Lire la recommandation complète",
    translatedFrom: "Traduit de l'anglais",
    original: "Texte original",
  },
  contact: {
    pdf: "PDF",
  },
  cases: {
    title: "Études de cas",
    intro:
      "Des projets racontés de bout en bout : le problème, mes décisions, les résultats.",
    filterLabel: "Filtrer par piste",
    back: "← Toutes les études de cas",
  },
  tracks: {
    tous: "Tous",
    dev: "Dev",
    produit: "Produit",
  },
  notFound: {
    title: "Page introuvable",
    text: "Cette page n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
  error: {
    title: "Une erreur est survenue",
    text: "Réessayez dans un instant.",
  },
  doors: {
    "dev-produit": {
      eyebrow: "Développement",
      title: "Je recrute un développeur",
      text: "Des features front et back pour la refonte complète d'Ellii, testées avec RSpec. Des projets personnels en React et Next.js depuis 2021.",
      chips: [
        "Ruby on Rails",
        "RSpec",
        "Sidekiq",
        "PostgreSQL",
        "React",
        "Next.js",
      ],
      cta: "Voir le profil développeur →",
    },
    po: {
      eyebrow: "Produit",
      title: "Je recrute un Product Owner",
      // TODO : « 16 ans » ou « 17 ans » ?
      text: "16 ans à écrire des specs, prioriser et livrer en Scrum avec des équipes pluridisciplinaires. Des tests utilisateurs et du suivi produit chez Ellii.",
      chips: [
        "Specs",
        "User stories",
        "Priorisation",
        "Scrum",
        "Tests utilisateurs",
        "PostHog",
      ],
      cta: "Voir le profil produit →",
    },
  },
} satisfies Dictionary;
