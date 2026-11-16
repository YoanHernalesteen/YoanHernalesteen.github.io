import type { Dictionary } from "./types";

export const fr = {
  skipToContent: "Aller au contenu",
  nav: {
    label: "Navigation principale",
    home: "Accueil",
    cases: "Études de cas",
    about: "À propos",
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
  footer: {
    legal: "Mentions légales",
    builtWith: "Codé en React + TypeScript",
    sourceCode: "code source",
  },
  home: {
    contactCta: "Me contacter",
    skillsTitle: "Compétences",
    casesTitle: "Études de cas",
    allCases: "Toutes les études de cas",
    careerTitle: "Parcours",
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
  positioning: {
    "dev-produit": {
      role: "Développeur produit",
      // TODO : phrase définitive
      headline:
        "Des années à concevoir des jeux pour leurs joueurs. Aujourd'hui, je conçois et je code des produits web.",
      cvLabel: "Télécharger mon CV",
      skills: [
        "Ruby on Rails",
        "RSpec",
        "Sidekiq",
        "PostgreSQL",
        "React",
        "TypeScript",
        "Recherche utilisateur",
        "Scrum",
      ],
    },
    po: {
      role: "Product Owner",
      // TODO : phrase définitive
      headline:
        "Des années à concevoir des jeux pour leurs joueurs. Aujourd'hui, je pilote des produits web, et je sais les coder.",
      cvLabel: "Télécharger mon CV",
      skills: [
        "Recherche utilisateur",
        "Priorisation",
        "Scrum",
        "Jira",
        "Confluence",
        "PostHog",
        "Customer.io",
        "Ruby on Rails",
      ],
    },
  },
} satisfies Dictionary;
