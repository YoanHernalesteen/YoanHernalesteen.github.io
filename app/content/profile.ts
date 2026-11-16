import type { Localized } from "~/i18n/types";

// Données de la maquette (direction A). Les valeurs entre crochets [ ]
// sont à compléter.

export interface CareerStep {
  startYear: number;
  period: Localized;
  title: Localized;
  details: Localized;
  // Le poste actuel, mis en valeur dans la frise.
  current?: boolean;
}

export const career: readonly CareerStep[] = [
  {
    startYear: 2004,
    period: { fr: "2004 – 2009" },
    title: { fr: "Informatique de gestion, puis game design" },
    details: {
      fr: "Bachelier en informatique (Charleroi) avec un stage de développeur Java chez Smals, puis Master Rubika Supinfogame, avec mention",
    },
  },
  {
    startYear: 2008,
    period: { fr: "2008 – 2011" },
    title: { fr: "Game & Level Designer" },
    details: {
      fr: "Ankama, AMA Studios, Birdies Road · Fighters Uncaged (Kinect, Ubisoft), Street Wrestler (EA Chillingo)",
    },
  },
  {
    startYear: 2011,
    period: { fr: "2011 – 2014" },
    title: { fr: "Designer" },
    details: { fr: "Ninja Theory, Cambridge · DmC Devil May Cry, Fightback" },
  },
  {
    startYear: 2014,
    period: { fr: "2014 – 2016" },
    title: { fr: "Game Content Manager" },
    details: {
      fr: "Gameloft · 15 jeux free-to-play suivis dans plusieurs studios",
    },
  },
  {
    startYear: 2016,
    period: { fr: "2016 – 2019" },
    title: { fr: "Senior Game Designer" },
    details: { fr: "Ubisoft Paris Mobile · Mighty Quest" },
  },
  {
    startYear: 2019,
    period: { fr: "2019 – 2025" },
    title: { fr: "Senior Game & Level Designer" },
    details: {
      fr: "Don't Nod · Tell Me Why, Jusant, Banishers, The Lonesome Guild",
    },
  },
  {
    startYear: 2025,
    period: { fr: "2025" },
    title: { fr: "Développement web et IA" },
    details: { fr: "Bootcamp Le Wagon" },
  },
  {
    startYear: 2026,
    period: { fr: "2026 – aujourd'hui" },
    title: { fr: "Développeur full-stack Ruby on Rails" },
    details: { fr: "Ellii · stage de 6 mois, puis freelance" },
    current: true,
  },
];

export interface Stat {
  value: string;
  label: Localized;
  link?: { href: string; label: Localized };
}

export const stats: readonly Stat[] = [
  {
    value: "25",
    label: { fr: "jeux sortis, dont 7 sur console et PC et 18 sur mobile" },
    link: {
      href: "https://www.mobygames.com/person/395069/yoan-hernalesteen/credits/",
      label: { fr: "voir mes crédits sur MobyGames" },
    },
  },
  {
    value: "6",
    label: { fr: "studios internationaux accompagnés chez Gameloft" },
  },
  {
    value: "12",
    label: { fr: "seniors rencontrés en tests utilisateurs chez Ellii" },
  },
  {
    value: "60+",
    label: { fr: "épisodes présentés sur le site du podcast The Rolistes" },
  },
];

export interface Game {
  title: string;
  meta: Localized;
  role: Localized;
  // Texte de l'emplacement en attendant le visuel officiel.
  media: Localized;
  mediaAlt: Localized;
  hasTrailer: boolean;
}

export const games: readonly Game[] = [
  {
    title: "Tell Me Why",
    meta: { fr: "Don't Nod · Microsoft · PC, Xbox One · 2020" },
    role: {
      fr: "Senior Level Designer : 3 niveaux de la conception à la finalisation, énigmes et mécaniques de jeu (Unreal 4).",
    },
    media: { fr: "[Visuel officiel · © Don't Nod]" },
    mediaAlt: { fr: "Visuel officiel de Tell Me Why" },
    hasTrailer: true,
  },
  {
    title: "Jusant",
    meta: { fr: "Don't Nod · 2023" },
    role: {
      fr: "Level design de plusieurs niveaux, playtests, et mise en place de l'accessibilité : simplification des contrôles (Unreal 5).",
    },
    media: { fr: "[Visuel officiel · © Don't Nod]" },
    mediaAlt: { fr: "Visuel officiel de Jusant" },
    hasTrailer: true,
  },
  {
    title: "Banishers: Ghosts of New Eden",
    meta: { fr: "Don't Nod · 2024" },
    role: { fr: "Système de combat d'un action-RPG (Unreal 5)." },
    media: { fr: "[Visuel officiel · © Don't Nod]" },
    mediaAlt: { fr: "Visuel officiel de Banishers: Ghosts of New Eden" },
    hasTrailer: true,
  },
  {
    title: "The Mighty Quest for Epic Loot",
    meta: { fr: "Ubisoft Paris Mobile · iOS, Android · 2019" },
    role: {
      fr: "Senior Game Designer : encadrement de plusieurs designers, boucle de jeu, rétention, monétisation, événements.",
    },
    media: { fr: "[Visuel officiel · © Ubisoft]" },
    mediaAlt: { fr: "Visuel officiel de The Mighty Quest for Epic Loot" },
    hasTrailer: true,
  },
  {
    title: "DmC Devil May Cry",
    meta: { fr: "Ninja Theory · Capcom · 2013" },
    role: {
      fr: "4 niveaux de la conception à la finalisation, démos de l'E3, participation à l'organisation des tests de focus (Unreal 3).",
    },
    media: { fr: "[Visuel officiel · © Capcom]" },
    mediaAlt: { fr: "Visuel officiel de DmC Devil May Cry" },
    hasTrailer: true,
  },
  {
    title: "15 jeux free-to-play",
    meta: { fr: "Gameloft · iOS, Android · 2014 – 2016" },
    role: {
      fr: "Asphalt 8: Airborne, Gangstar Vegas, Dragon Mania Legends, Dungeon Hunter 5, The Amazing Spider-Man 2… Direction design suivie dans plusieurs studios.",
    },
    media: { fr: "[Mosaïque de visuels officiels · © Gameloft]" },
    mediaAlt: { fr: "Visuels officiels de jeux Gameloft" },
    hasTrailer: false,
  },
];
