import type { Localized } from "~/i18n/types";

export const TESTIMONIAL_PAGES = ["accueil", "dev"] as const;
export type TestimonialPage = (typeof TESTIMONIAL_PAGES)[number];

// Volontairement sans champ pour le nom : on n'affiche que le poste
// et l'entreprise de la personne (un test le vérifie).
export interface Testimonial {
  // Poste et entreprise, par exemple « Cofondateur et CTO · Ellii ».
  role: Localized;
  // Lien avec Yoan, par exemple « a encadré Yoan ».
  relation?: Localized;
  // Texte complet, un paragraphe par élément.
  paragraphs: Localized<readonly string[]>;
  // Langue d'origine quand le texte affiché est une traduction.
  translatedFrom?: "en";
  // Texte original. Pas affiché sur le site français : il servira tel quel
  // pour la version anglaise.
  original?: readonly string[];
  // Phrase mise en avant sur chaque page où la recommandation apparaît.
  highlights: Partial<Record<TestimonialPage, Localized>>;
  // Phrase mise en avant dans une étude de cas, indexée par son slug.
  caseHighlights?: Record<string, Localized>;
}

export const testimonials: readonly Testimonial[] = [
  {
    role: { fr: "Cofondateur et CTO · Ellii" },
    relation: { fr: "a encadré Yoan" },
    paragraphs: {
      fr: [
        "J'ai eu le plaisir de travailler avec Yoan chez Ellii, où il a rejoint l'équipe technique que je dirige en tant que CTO.",
        "Yoan connaissait déjà notre stack Ruby on Rails, et il s'est approprié très rapidement notre base de code et les spécificités de notre métier. Il sait tirer pleinement parti des outils d'IA pour avancer, explorer et itérer efficacement.",
        "Ce qui le distingue surtout, c'est sa longue expérience dans le développement de jeux vidéo. Il en a gardé une assise technique solide, mais aussi une vision produit particulièrement fine. Yoan se pose les bonnes questions, garde toujours en tête l'expérience de l'utilisateur final, et n'hésite pas à faire des parallèles avec ce qu'il a vu dans l'industrie du jeu. Ces regards croisés ont souvent apporté un éclairage pertinent à nos discussions.",
        "Au quotidien, Yoan est autonome et force de proposition. On peut lui confier un sujet en sachant qu'il ira au bout, et souvent avec une idée en plus.",
        "Je le recommande sans hésiter à toute équipe qui cherche un développeur expérimenté, curieux et soucieux du produit.",
      ],
    },
    highlights: {
      accueil: {
        fr: "Ce qui le distingue surtout, c'est sa longue expérience dans le développement de jeux vidéo. Il en a gardé une assise technique solide, mais aussi une vision produit particulièrement fine.",
      },
      dev: {
        fr: "Yoan connaissait déjà notre stack Ruby on Rails, et il s'est approprié très rapidement notre base de code et les spécificités de notre métier. Il sait tirer pleinement parti des outils d'IA pour avancer, explorer et itérer efficacement.",
      },
    },
    caseHighlights: {
      "ellii-refonte-tests-seniors": {
        fr: "Yoan se pose les bonnes questions, garde toujours en tête l'expérience de l'utilisateur final, et n'hésite pas à faire des parallèles avec ce qu'il a vu dans l'industrie du jeu.",
      },
      "ellii-recommandation-ateliers": {
        fr: "On peut lui confier un sujet en sachant qu'il ira au bout, et souvent avec une idée en plus.",
      },
    },
  },
  {
    role: { fr: "Producer · Don't Nod" },
    relation: { fr: "a encadré Yoan sur Jusant" },
    paragraphs: {
      fr: [
        "J'ai eu la chance de travailler avec Yoan pendant plus de 3 ans, et ce fut un vrai plaisir !",
        "Au-delà de ses solides compétences et de sa culture en design, Yoan a un vrai esprit d'équipe : il est toujours prêt à aider ses coéquipiers et à leur apporter son soutien ou ses conseils.",
        "Il sait aussi donner des retours constructifs, pertinents et argumentés, à son équipe comme à ses responsables, tout en restant assez souple et ouvert d'esprit pour s'adapter rapidement aux contraintes de temps ou de création des projets.",
        "Si vous cherchez une recrue sérieuse, investie et digne de confiance pour votre équipe, Yoan est un pari (très) sûr !",
      ],
    },
    translatedFrom: "en",
    original: [
      "I've had the chance to work with Yoan for 3+ years, and it's been a real pleasure!",
      "Beyond his strong Design related skills and culture, Yoan is a great team player as well, always eager to help his teammates and provide support or advice.",
      "He can also give constructive, relevant and argumented feedback, both among his team and to his managers, while still remaining flexible and open-minded enough to swiftly adapt to projects' time or creative constraints.",
      "Should you need a serious, dedicated and trustworthy addition to your team, Yoan is a (very) safe bet!",
    ],
    highlights: {
      accueil: {
        fr: "Il sait aussi donner des retours constructifs, pertinents et argumentés, à son équipe comme à ses responsables, tout en restant assez souple et ouvert d'esprit pour s'adapter rapidement aux contraintes de temps ou de création des projets.",
      },
    },
  },
  {
    role: { fr: "HQ Producer · Gameloft" },
    relation: { fr: "collègue sur Gangstar Vegas et Asphalt 8" },
    paragraphs: {
      fr: [
        "J'ai passé beaucoup de temps à travailler avec Yoan ces 18 derniers mois, principalement à relire ensemble des documents de game design et des versions de jalon. Grâce à sa connaissance approfondie du design et à ses capacités d'analyse, nous avons repéré et anticipé d'innombrables problèmes dans nos jeux. Pour moi, il ne fait aucun doute que sans ses contributions, ces projets n'auraient jamais atteint le niveau de qualité dont nous sommes si fiers aujourd'hui.",
        "Ensemble, nous avons travaillé sur Gangstar Vegas, Asphalt 8 et un projet non annoncé.",
      ],
    },
    translatedFrom: "en",
    original: [
      "I've spend a lot of time working with Yoan over the past 18 months, mainly reviewing game design documents and milestone versions together. Thanks to his deep design knowledge and his analytical skills, we spotted and anticipated countless issues in our games.... To me, there is no doubt that without his contributions, these projects would never have achieved this same level of quality that we are so proud of today.",
      "Together we worked on Gangstar Vegas, Asphalt 8 and one undisclosed project.",
    ],
    highlights: {
      accueil: {
        fr: "Grâce à sa connaissance approfondie du design et à ses capacités d'analyse, nous avons repéré et anticipé d'innombrables problèmes dans nos jeux.",
      },
    },
    caseHighlights: {
      "gameloft-multi-studios": {
        fr: "Pour moi, il ne fait aucun doute que sans ses contributions, ces projets n'auraient jamais atteint le niveau de qualité dont nous sommes si fiers aujourd'hui.",
      },
    },
  },
  {
    role: { fr: "Assistant Production Manager · Gameloft" },
    relation: { fr: "collègue" },
    paragraphs: {
      fr: [
        "Yoan est un game designer doté d'une grande culture du jeu vidéo, ce qui lui donne l'avantage d'avoir toujours la bonne référence pour le bon projet.",
        "Il s'investit vraiment dans son travail et n'hésite pas à donner son point de vue, avec des arguments solides, même quand ce n'est pas l'avis de la majorité.",
      ],
    },
    translatedFrom: "en",
    original: [
      "Yoan is a game designer with a strong gaming culture which gives him this advantage to always have the good reference for the right project.",
      "He is someone really involved in his work and he does not hesitate to give his point of view with strong arguments even if it is not the opinion of the majority.",
    ],
    highlights: {},
    caseHighlights: {
      "gameloft-multi-studios": {
        fr: "Il s'investit vraiment dans son travail et n'hésite pas à donner son point de vue, avec des arguments solides, même quand ce n'est pas l'avis de la majorité.",
      },
    },
  },
  {
    role: { fr: "CEO · Ellii" },
    relation: { fr: "a travaillé avec Yoan" },
    // « avec » ajouté : il manque dans le texte publié sur LinkedIn.
    paragraphs: {
      fr: [
        "Un vrai plaisir de travailler avec Yoan! Corpo, sérieux, autonome, autodidacte, sont tout autant de qualités dont nous avons eu la chance de pouvoir profiter.",
      ],
    },
    highlights: {},
    caseHighlights: {
      "ellii-refonte-tests-seniors": {
        fr: "Un vrai plaisir de travailler avec Yoan! Corpo, sérieux, autonome, autodidacte, sont tout autant de qualités dont nous avons eu la chance de pouvoir profiter.",
      },
    },
  },
];

export interface PageTestimonial {
  testimonial: Testimonial;
  highlight: Localized;
}

// Les recommandations d'une étude de cas, chacune avec sa phrase mise en avant.
export function testimonialsForCase(slug: string): PageTestimonial[] {
  return testimonials.flatMap((testimonial) => {
    const highlight = testimonial.caseHighlights?.[slug];
    return highlight ? [{ testimonial, highlight }] : [];
  });
}

// Les recommandations d'une page, chacune avec sa phrase mise en avant.
export function testimonialsFor(page: TestimonialPage): PageTestimonial[] {
  return testimonials.flatMap((testimonial) => {
    const highlight = testimonial.highlights[page];
    return highlight ? [{ testimonial, highlight }] : [];
  });
}
