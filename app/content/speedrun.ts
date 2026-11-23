import bbgLogo from "~/assets/logos/bigbadgame-a-thon.webp";
import gdqLogo from "~/assets/logos/games-done-quick.webp";
import jppLogo from "~/assets/logos/jpp-speedrun.webp";
import type { Localized } from "~/i18n/types";

export interface SpeedrunActivity {
  name: string;
  // Logo carré en haut à droite de la carte, décoratif : le nom est écrit
  // dans le titre ou le texte de la carte.
  logo?: string;
  role: Localized;
  // Année de début (affichée « depuis 2026 »).
  since: number;
  text: Localized;
  links?: readonly { label: string; href: string }[];
  // Étude de cas liée, si elle existe (un test vérifie le slug).
  caseSlug?: string;
}

export const speedrunActivities: readonly SpeedrunActivity[] = [
  {
    name: "JPP Speedrun",
    logo: jppLogo,
    role: { fr: "Cofondateur" },
    since: 2026,
    text: {
      fr: "2 événements par an : un marathon en direct avec des runners francophones, et le restream en français du BigBadGame-a-thon sur 2 week-ends. Programmation, coordination de l'équipe, supervision technique.",
    },
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@JPP_Speedrun" },
      { label: "Twitch", href: "https://www.twitch.tv/jpp_speedrun" },
    ],
    caseSlug: "jpp-speedrun",
  },
  {
    name: "BigBadGame-a-thon",
    logo: bbgLogo,
    role: { fr: "Membre du staff" },
    since: 2024,
    text: { fr: "Programmation des runs et animation de l'événement." },
  },
  {
    name: "Marathons caritatifs internationaux",
    logo: gdqLogo,
    role: { fr: "Runner et commentateur" },
    since: 2021,
    text: {
      fr: "Des runs et du commentaire lors de marathons comme Games Done Quick, Speedons, Interglitches ou le Benelux Speedrun Gathering, dont certains récoltent des millions pour des associations.",
    },
  },
];
