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
  dev: {
    metaTitle: "Profil développeur",
    eyebrow: "Côté code",
    // TODO : « 16 ans » ou « 17 ans » ?
    title: "Développeur Ruby on Rails, avec 16 ans de culture produit.",
    lede: "Chez Ellii, je développe des features front et back pour la refonte complète d'une plateforme d'ateliers en ligne pour seniors, testées avec RSpec. Je pratique React et Next.js sur mes projets personnels depuis 2021, et je progresse en TypeScript avec ce site.",
    cvCta: "Télécharger le CV développeur",
    githubCta: "Voir mon GitHub",
    stackEyebrow: "Ma stack",
    stack: [
      {
        title: "Back-end",
        text: "Ruby on Rails · RSpec · Sidekiq · PostgreSQL · API REST · Webhooks",
      },
      {
        title: "Front-end",
        text: "Stimulus · React · Next.js · JavaScript · TypeScript (en cours)",
      },
      {
        title: "Outils",
        text: "Git et GitHub · PostHog · Customer.io · Claude Code",
      },
    ],
    strengthsEyebrow: "Ce que j'apporte à une équipe",
    strengths: [
      {
        title: "Je pars de l'utilisateur",
        // TODO : « 16 ans » ou « 17 ans » ?
        text: "16 ans à concevoir des parcours de jeu, l'accessibilité des contrôles de Jusant, et des tests utilisateurs auprès de 12 seniors chez Ellii.",
      },
      {
        title: "Je comprends les specs",
        text: "J'en ai écrit pendant des années : je clarifie le besoin avant de coder, et je parle la même langue que le Product Owner.",
      },
      {
        title: "Je livre en équipe",
        text: "Scrum pratiqué pendant des années en studio, et Media Trackr livré à 3 en 2 semaines.",
      },
    ],
    casesEyebrow: "Études de cas · Développement",
    casesTitle: "Du code en production",
    contactTitle: "Vous recrutez un développeur Rails ? Parlons-en.",
  },
  produit: {
    metaTitle: "Profil Product Owner",
    eyebrow: "Côté produit",
    title: "Un Product Owner qui comprend le code.",
    // TODO : « 16 ans » ou « 17 ans » ?
    lede: "Pendant 16 ans, j'ai écrit des specs, priorisé des features et livré en Scrum avec des développeurs, des artistes et des animateurs. Chez Ubisoft, j'ai encadré plusieurs designers et piloté la rétention et la monétisation d'un RPG mobile. Chez Ellii, j'ai organisé des tests utilisateurs auprès de 12 seniors et mis en place le suivi produit avec PostHog.",
    cvCta: "Télécharger le CV Product Owner",
    casesCta: "Voir les études de cas produit",
    methodEyebrow: "Ma méthode",
    methodTitle: "Comprendre, prioriser, livrer, mesurer",
    method: [
      {
        title: "Comprendre",
        text: "Tests utilisateurs et playtests, recueil des besoins, lecture des données d'usage.",
      },
      {
        title: "Prioriser",
        text: "Backlog, user stories, critères d'acceptation, arbitrages avec l'équipe.",
      },
      {
        title: "Livrer",
        text: "Scrum, specs claires pour les développeurs, recette et validation.",
      },
      {
        title: "Mesurer",
        text: "Plan de suivi des événements dans PostHog, indicateurs, itérations.",
      },
    ],
    casesEyebrow: "Études de cas · Produit",
    casesTitle: "Des décisions fondées sur des preuves",
    gamesEyebrow: "Jeux livrés · 2008 – 2025",
    gamesTitle: "25 jeux, de la spec à la sortie",
    gamesLede:
      "7 jeux console et PC, 18 jeux mobiles, chez Don't Nod, Ubisoft, Gameloft, Ninja Theory, AMA Studios, Birdies Road et Ankama. Une sélection :",
    allCredits: "Tous mes crédits sur MobyGames →",
    contactTitle: "Vous recrutez un Product Owner ? Parlons-en.",
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
