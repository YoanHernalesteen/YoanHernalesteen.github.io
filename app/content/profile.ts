import banishersImage from "~/assets/games/banishers.webp";
import dmcImage from "~/assets/games/dmc-devil-may-cry.webp";
import dragonManiaImage from "~/assets/games/dragon-mania-legends.webp";
import jusantImage from "~/assets/games/jusant.webp";
import mightyQuestImage from "~/assets/games/mighty-quest.webp";
import tellMeWhyImage from "~/assets/games/tell-me-why.webp";
import ankamaLogo from "~/assets/logos/ankama.webp";
import dontNodLogo from "~/assets/logos/dont-nod.webp";
import elliiLogo from "~/assets/logos/ellii.webp";
import gameloftLogo from "~/assets/logos/gameloft.webp";
import condorcetLogo from "~/assets/logos/haute-ecole-condorcet.webp";
import leWagonLogo from "~/assets/logos/le-wagon.webp";
import ninjaTheoryLogo from "~/assets/logos/ninja-theory.webp";
import rubikaLogo from "~/assets/logos/rubika.webp";
import ubisoftLogo from "~/assets/logos/ubisoft.webp";
import type { Localized } from "~/i18n/types";

export type CareerKind = "formation" | "poste";

export interface CareerStep {
  // Formation ou poste : étiqueté et dessiné différemment dans la frise.
  kind: CareerKind;
  startYear: number;
  period: Localized;
  title: Localized;
  details: Localized;
  // Logo de l'entreprise ou de l'école : vignette carrée de 160 px sur le
  // fond d'origine du logo (app/assets/logos/), décorative car le nom est
  // écrit à côté.
  logo?: string;
}

export const career: readonly CareerStep[] = [
  {
    kind: "formation",
    startYear: 2004,
    logo: condorcetLogo,
    period: { fr: "2004 – 2007" },
    title: { fr: "Bachelier en informatique de gestion" },
    details: {
      fr: "Haute École Provinciale de Charleroi · stage de développeur Java chez Smals",
    },
  },
  {
    kind: "formation",
    startYear: 2007,
    logo: rubikaLogo,
    period: { fr: "2007 – 2009" },
    title: { fr: "Master en game design et gestion de production" },
    details: { fr: "Rubika Supinfogame, avec mention" },
  },
  {
    kind: "poste",
    startYear: 2008,
    logo: ankamaLogo,
    period: { fr: "2008 – 2011" },
    title: { fr: "Game & Level Designer" },
    details: {
      fr: "Ankama, AMA Studios, Birdies Road · Fighters Uncaged (Kinect, Ubisoft), Street Wrestler (EA Chillingo)",
    },
  },
  {
    kind: "poste",
    startYear: 2011,
    logo: ninjaTheoryLogo,
    period: { fr: "2011 – 2014" },
    title: { fr: "Designer" },
    details: { fr: "Ninja Theory, Cambridge · DmC Devil May Cry, Fightback" },
  },
  {
    kind: "poste",
    startYear: 2014,
    logo: gameloftLogo,
    period: { fr: "2014 – 2016" },
    title: { fr: "Game Content Manager" },
    details: {
      fr: "Gameloft · 15 jeux free-to-play suivis dans plusieurs studios",
    },
  },
  {
    kind: "poste",
    startYear: 2016,
    logo: ubisoftLogo,
    period: { fr: "2016 – 2019" },
    title: { fr: "Senior Game Designer" },
    details: { fr: "Ubisoft Paris Mobile · Mighty Quest" },
  },
  {
    kind: "poste",
    startYear: 2019,
    logo: dontNodLogo,
    period: { fr: "2019 – 2025" },
    title: { fr: "Senior Game & Level Designer" },
    details: {
      fr: "Don't Nod · Tell Me Why, Jusant, Banishers, The Lonesome Guild",
    },
  },
  {
    kind: "formation",
    startYear: 2025,
    logo: leWagonLogo,
    period: { fr: "2025" },
    title: { fr: "Développement web et IA" },
    details: { fr: "Bootcamp Le Wagon" },
  },
  {
    kind: "poste",
    startYear: 2026,
    logo: elliiLogo,
    period: { fr: "Avril – novembre 2026" },
    title: { fr: "Développeur full-stack Ruby on Rails" },
    details: { fr: "Ellii · freelance, après un stage de 6 mois" },
  },
];

export interface Game {
  title: string;
  // Année de sortie, pour le tri (pour une période, l'année de fin).
  year: number;
  meta: Localized;
  role: Localized;
  // Visuel officiel facultatif (image dans app/assets/games/).
  image?: { src: string; alt: Localized; credit: string };
  hasTrailer: boolean;
  // Affiché sur l'accueil : un jeu par type de public.
  highlighted?: boolean;
}

export const games: readonly Game[] = [
  {
    title: "Tell Me Why",
    year: 2020,
    meta: { fr: "Don't Nod · Microsoft · PC, Xbox One · 2020" },
    role: {
      fr: "Senior Level Designer : 3 niveaux de la conception à la finalisation, énigmes et mécaniques de jeu (Unreal 4).",
    },
    image: {
      src: tellMeWhyImage,
      alt: {
        fr: "Visuel officiel de Tell Me Why : Alyson et Tyler de profil, entourés de branches enneigées.",
      },
      credit: "© Don't Nod",
    },
    hasTrailer: true,
  },
  {
    title: "Jusant",
    year: 2023,
    meta: { fr: "Don't Nod · 2023" },
    role: {
      fr: "Level design de plusieurs niveaux, playtests, et mise en place de l'accessibilité : simplification des contrôles (Unreal 5).",
    },
    image: {
      src: jusantImage,
      alt: {
        fr: "Visuel officiel de Jusant : le personnage marche dans le désert vers une immense tour rocheuse.",
      },
      credit: "© Don't Nod",
    },
    hasTrailer: true,
    highlighted: true,
  },
  {
    title: "Banishers: Ghosts of New Eden",
    year: 2024,
    meta: { fr: "Don't Nod · 2024" },
    role: { fr: "Système de combat d'un action-RPG (Unreal 5)." },
    image: {
      src: banishersImage,
      alt: {
        fr: "Visuel officiel de Banishers: Ghosts of New Eden : Red, une torche à la main, et Antea, entourée d'une lueur spectrale.",
      },
      credit: "© Don't Nod",
    },
    hasTrailer: true,
  },
  {
    title: "The Mighty Quest for Epic Loot",
    year: 2019,
    meta: { fr: "Ubisoft Paris Mobile · iOS, Android · 2019" },
    role: {
      fr: "Senior Game Designer : encadrement de 4 game designers, boucle de jeu, rétention, monétisation, événements.",
    },
    image: {
      src: mightyQuestImage,
      alt: {
        fr: "Visuel officiel de The Mighty Quest for Epic Loot : un chevalier couronné brandit une épée au milieu de monstres et d'un tas d'or.",
      },
      credit: "© Ubisoft",
    },
    hasTrailer: true,
    highlighted: true,
  },
  {
    title: "DmC Devil May Cry",
    year: 2013,
    meta: { fr: "Ninja Theory · Capcom · 2013" },
    role: {
      fr: "4 niveaux de la conception à la finalisation, démos de l'E3, participation à l'organisation des tests de focus (Unreal 3).",
    },
    image: {
      src: dmcImage,
      alt: {
        fr: "Affiche officielle de DmC Devil May Cry : Dante, un pistolet dans chaque main, devant une ville en flammes.",
      },
      credit: "© Capcom",
    },
    hasTrailer: true,
  },
  {
    title: "15 jeux free-to-play",
    year: 2016,
    meta: { fr: "Gameloft · iOS, Android · 2014 – 2016" },
    role: {
      fr: "Asphalt 8: Airborne, Gangstar Vegas, Dragon Mania Legends, Dungeon Hunter 5, The Amazing Spider-Man 2… Direction design suivie dans plusieurs studios.",
    },
    image: {
      src: dragonManiaImage,
      alt: {
        fr: "Visuel officiel de Dragon Mania Legends : quatre jeunes dragons colorés dans un paysage verdoyant.",
      },
      credit: "© Gameloft",
    },
    hasTrailer: false,
    highlighted: true,
  },
];

// Les jeux du plus récent au plus ancien, sans modifier la liste d'origine.
export function gamesNewestFirst(list: readonly Game[]): Game[] {
  return [...list].sort((a, b) => b.year - a.year);
}
