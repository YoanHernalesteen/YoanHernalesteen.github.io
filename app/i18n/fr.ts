import type { Dictionary } from "./types";

export const fr = {
  skipToContent: "Aller au contenu",
  ogImageAlt: "Yoan Hernalesteen, Product Manager au profil technique",
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
      pm: "CV Product Manager",
    },
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
  },
  theme: {
    dark: "Thème sombre",
  },
  footer: {
    legal: "Mentions légales",
    builtWith: "Codé en React + TypeScript",
    sourceCode: "code source",
  },
  home: {
    metaTitle: "Product Manager au profil technique",
    metaDescription:
      "Product Manager au profil technique. 16 ans à concevoir des jeux chez Ubisoft, Don't Nod et Gameloft, puis une plateforme pour seniors chez Ellii.",
    eyebrow: "Product Manager au profil technique",
    devLink: "Voir mes expériences de développement →",
    careerCredits: "Tous mes jeux sur MobyGames →",
    casesEyebrow: "Études de cas",
    casesTitle: "Ce que j'ai conçu et livré",
    allCases: "Toutes les études de cas →",
    testimonialsLabel: "Recommandations",
    testimonialsTitle: "Ils ont travaillé avec moi",
    allTestimonials: "Toutes mes recommandations sur LinkedIn →",
    careerTitle: "Du game design au produit",
    careerLede:
      "Le fil rouge : concevoir pour des utilisateurs, piloter des features, travailler en Scrum.",
    careerKinds: {
      formation: "Formation",
      poste: "Poste",
    },
    speedrunEyebrow: "Speedrun",
    speedrunTitle: "Organiser des événements en direct",
    speedrunLede:
      "En dehors du travail, je pilote des marathons de speedrun : une date fixe, une équipe de bénévoles, une programmation à construire et une technique qui doit tenir en direct.",
    since: (year) => `depuis ${year}`,
    speedrunCase: "Lire l'étude de cas →",
    contactTitle: "Me contacter pour un poste ou une mission",
    contactLede:
      "Basé à Issy-les-Moulineaux. Ouvert à l'Île-de-France, à Lille, à la Belgique et au télétravail.",
  },
  dev: {
    metaTitle: "Profil développeur",
    eyebrow: "Côté code",

    title: "Je code en Ruby on Rails, avec 16 ans de culture produit.",
    lede: "Chez Ellii, d'avril à novembre 2026, j'ai développé des features front et back pour la refonte complète d'une plateforme d'ateliers en ligne pour seniors, testées avec RSpec. Je pratique React et Next.js sur mes projets personnels depuis 2021, et je progresse en TypeScript avec ce site.",
    cvCta: "Télécharger mon CV",
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
        text: "16 ans à concevoir des parcours de jeu, l'accessibilité des contrôles de Jusant, et des tests utilisateurs auprès de 12 seniors chez Ellii.",
      },
      {
        title: "Je comprends les specs",
        text: "J'en ai écrit pendant des années : je clarifie le besoin avant de coder, et je parle la même langue que le Product Manager.",
      },
      {
        title: "Je livre en équipe",
        text: "Scrum pratiqué pendant des années en studio, et Media Trackr livré à 3 en 2 semaines.",
      },
    ],
    casesEyebrow: "Études de cas · Développement",
    casesTitle: "Du code en production",
    contactTitle: "Me contacter pour un poste ou une mission en Ruby on Rails",
  },
  produit: {
    title: "Un Product Manager qui comprend le code.",
    lede: "16 ans à concevoir des produits pour des publics très différents : joueurs mobiles chez Gameloft et Ubisoft, joueurs console et PC chez Don't Nod, puis seniors chez Ellii. J'écris les specs, je priorise avec l'équipe, je teste avec les utilisateurs et je suis les KPI. Chez Ubisoft, j'ai encadré 4 game designers ; chez Ellii, j'ai aussi développé en Ruby on Rails.",
    cvCta: "Télécharger mon CV",
    casesCta: "Voir les études de cas produit",
    methodEyebrow: "Ma méthode",
    methodTitle: "Comprendre, prioriser, livrer, mesurer",
    method: [
      {
        title: "Comprendre",
        text: "Tests utilisateurs et playtests, recueil des besoins, lecture des données d'usage. Chez Ellii, 12 seniors testés : note des visuels passée de 3,8 à 4,7 sur 5.",
      },
      {
        title: "Prioriser",
        text: "Backlog, user stories, critères d'acceptation, arbitrages avec l'équipe. Chez Gameloft, sur Dragon Mania Legends, avec un petit budget, nous avons misé sur l'attachement aux dragons plutôt que sur le combat ou la construction : 100 M+ téléchargements.",
      },
      {
        title: "Livrer",
        text: "Scrum, specs claires pour les développeurs, recette et validation. 25 jeux livrés, dont 15 free-to-play suivis avec 6 studios internationaux chez Gameloft.",
      },
      {
        title: "Mesurer",
        text: "Plan de suivi des événements dans PostHog, indicateurs, itérations. Chez Ubisoft, un A/B test a départagé 2 tutoriels : 80 % de complétion pour la version guidée, contre moins de 50 %.",
      },
    ],
  },
  gameloft: {
    roles: {
      both: "Création et mises à jour",
      updates: "Mises à jour",
      creation: "Création",
    },
    googlePlay: "Google Play",
    appStore: "App Store",
    downloads: (range) => `${range} téléchargements`,
    ratingLabel: (rating) => `${rating} sur 5`,
    paid: "Jeu payant",
  },
  games: {
    eyebrow: "Jeux livrés · 2008 – 2025",
    title: "25 jeux, de la spec à la sortie",
    lede: "7 jeux console et PC, 18 jeux mobiles, chez Don't Nod, Ubisoft, Gameloft, Ninja Theory, AMA Studios, Birdies Road et Ankama. Une sélection :",
    allCredits: "Tous mes crédits sur MobyGames →",
    highlightTitle: "3 jeux, 3 publics",
    allGames: "Voir tous les jeux →",
  },
  testimonial: {
    readFull: "Lire la recommandation complète",
    hideFull: "Masquer la recommandation complète",
    translatedFrom: "Traduit de l'anglais",
  },
  contact: {
    availability: "Disponible immédiatement.",
    pdf: "PDF",
  },
  video: {
    play: (title) => `Lire la vidéo : ${title}`,
  },
  cases: {
    metaTitle: "Études de cas",
    eyebrow: "Études de cas",
    title: "Des problèmes, des décisions, des résultats",
    intro:
      "Pour chaque projet : le contexte, mon rôle, ce que j'ai choisi d'écarter et ce qui a changé. Filtrez par domaine : produit ou développement.",
    listTitle: "Toutes les études de cas",
    filterLabel: "Filtrer les études de cas",
    filters: {
      tous: "Tous",
      dev: "Développement",
      produit: "Produit",
    },
    resultCount: (count) =>
      count > 1 ? `${count} études de cas` : `${count} étude de cas`,
    readCase: "Lire l'étude de cas →",
    testimonialsTitle: "Recommandations",
    back: "← Toutes les études de cas",
    next: "Étude suivante",
    brief: {
      title: "En bref",
      role: "Mon rôle",
      period: "Période",
      team: "Équipe",
      tools: "Outils",
      shows: "Ce que ce cas montre",
    },
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
} satisfies Dictionary;
