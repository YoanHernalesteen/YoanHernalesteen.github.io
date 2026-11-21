import amazingSpiderMan2Icon from "~/assets/games/gameloft/amazing-spider-man-2.webp";
import asphalt8Icon from "~/assets/games/gameloft/asphalt-8.webp";
import asphaltNitroIcon from "~/assets/games/gameloft/asphalt-nitro.webp";
import captainAmericaIcon from "~/assets/games/gameloft/captain-america.webp";
import carsIcon from "~/assets/games/gameloft/cars-fast-as-lightning.webp";
import countryFriendsIcon from "~/assets/games/gameloft/country-friends.webp";
import dragonManiaIcon from "~/assets/games/gameloft/dragon-mania-legends.webp";
import dungeonHunter5Icon from "~/assets/games/gameloft/dungeon-hunter-5.webp";
import gangstarNewOrleansIcon from "~/assets/games/gameloft/gangstar-new-orleans.webp";
import gangstarVegasIcon from "~/assets/games/gameloft/gangstar-vegas.webp";
import godsOfRomeIcon from "~/assets/games/gameloft/gods-of-rome.webp";
import ironBladeIcon from "~/assets/games/gameloft/iron-blade.webp";
import theBlacklistIcon from "~/assets/games/gameloft/the-blacklist.webp";
import trivialPursuitIcon from "~/assets/games/gameloft/trivial-pursuit-and-friends.webp";
import unoIcon from "~/assets/games/gameloft/uno-and-friends.webp";

// Mon rôle sur chaque jeu, dans l'ordre d'affichage des groupes.
export const GAMELOFT_ROLES = ["both", "creation", "updates"] as const;
export type GameloftRole = (typeof GAMELOFT_ROLES)[number];

export interface GameloftGame {
  title: string;
  icon: string;
  role: GameloftRole;
  // Tranche de téléchargements affichée par Google Play (« 100 M+ »).
  playInstalls?: number;
  playRating?: number;
  appStoreRating?: number;
}

// Chiffres publics relevés le 2026-11-21 sur Google Play et l'App Store US.
// Pour les jeux retirés des stores : dernière copie archivée de leur page
// (Wayback Machine). Sans chiffre fiable, le champ est laissé vide.
export const gameloftGames: readonly GameloftGame[] = [
  {
    title: "Dragon Mania Legends",
    icon: dragonManiaIcon,
    role: "both",
    playInstalls: 100_000_000,
    playRating: 4.4,
    appStoreRating: 4.8,
  },
  {
    title: "Dungeon Hunter 5",
    icon: dungeonHunter5Icon,
    role: "both",
    playInstalls: 10_000_000,
    playRating: 4.3,
    appStoreRating: 4.7,
  },
  {
    title: "Gods of Rome",
    icon: godsOfRomeIcon,
    role: "both",
    playInstalls: 10_000_000,
    playRating: 4.3,
    appStoreRating: 4.2,
  },
  {
    title: "The Amazing Spider-Man 2",
    icon: amazingSpiderMan2Icon,
    role: "both",
    playInstalls: 500_000,
    playRating: 4.3,
    appStoreRating: 4.6,
  },
  {
    title: "Asphalt 8: Airborne",
    icon: asphalt8Icon,
    role: "updates",
    playInstalls: 500_000_000,
    playRating: 4.6,
    appStoreRating: 4.7,
  },
  {
    title: "Gangstar Vegas",
    icon: gangstarVegasIcon,
    role: "updates",
    playInstalls: 100_000_000,
    playRating: 4.4,
    appStoreRating: 4.6,
  },
  {
    title: "Captain America: The Winter Soldier",
    icon: captainAmericaIcon,
    role: "updates",
    playInstalls: 10_000_000,
    playRating: 3.8,
    appStoreRating: 4.0,
  },
  {
    title: "UNO & Friends",
    icon: unoIcon,
    role: "updates",
    playInstalls: 50_000_000,
    playRating: 4.1,
    appStoreRating: 3.5,
  },
  {
    title: "Country Friends",
    icon: countryFriendsIcon,
    role: "creation",
    playInstalls: 1_000_000,
    playRating: 3.8,
    appStoreRating: 4.1,
  },
  {
    title: "Trivial Pursuit & Friends",
    icon: trivialPursuitIcon,
    role: "creation",
  },
  {
    title: "Iron Blade",
    icon: ironBladeIcon,
    role: "creation",
    playInstalls: 10_000_000,
    playRating: 4.0,
    appStoreRating: 4.7,
  },
  {
    title: "The Blacklist: Conspiracy",
    icon: theBlacklistIcon,
    role: "creation",
    playInstalls: 1_000_000,
    playRating: 4.0,
    appStoreRating: 4.0,
  },
  {
    title: "Asphalt Nitro",
    icon: asphaltNitroIcon,
    role: "creation",
    playInstalls: 100_000_000,
    playRating: 4.4,
  },
  {
    title: "Cars: Fast as Lightning",
    icon: carsIcon,
    role: "creation",
    playInstalls: 50_000_000,
    playRating: 4.1,
    appStoreRating: 4.5,
  },
  {
    title: "Gangstar New Orleans",
    icon: gangstarNewOrleansIcon,
    role: "creation",
    playInstalls: 50_000_000,
    playRating: 4.3,
    appStoreRating: 4.7,
  },
];

// Les jeux d'un rôle, du plus au moins téléchargé ; sans chiffre en dernier.
// Le tri est stable : deux jeux à égalité gardent l'ordre de la liste.
export function gamesForRole(
  list: readonly GameloftGame[],
  role: GameloftRole,
): GameloftGame[] {
  return list
    .filter((game) => game.role === role)
    .sort((a, b) => (b.playInstalls ?? -1) - (a.playInstalls ?? -1));
}

// Espace insécable : « 500 M+ » ne se coupe jamais en fin de ligne.
const NBSP = " ";

// 500 000 000 → « 500 M+ », comme les tranches de Google Play.
export function formatInstalls(installs: number): string {
  if (installs >= 1_000_000) return `${installs / 1_000_000}${NBSP}M+`;
  if (installs >= 1_000) return `${installs / 1_000}${NBSP}k+`;
  return `${installs}+`;
}

// 4.4 → « 4,4 » ; 4 → « 4,0 ».
export function formatRating(rating: number): string {
  return rating.toFixed(1).replace(".", ",");
}
