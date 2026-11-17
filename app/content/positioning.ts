import type { Track } from "./cases";

// Les angles possibles du site.
// `as const` fige le tableau : son type devient ["dev-produit", "po"]
// au lieu de string[], ce qui permet d'en déduire le type Focus.
export const FOCUSES = ["dev-produit", "po"] as const;
export type Focus = (typeof FOCUSES)[number];

// ⬇ Le seul réglage à changer pour basculer le site vers le profil PO.
export const FOCUS: Focus = "dev-produit";

interface Positioning {
  // Piste des études de cas affichées en premier.
  primaryTrack: Track;
  // CV mis en avant (fichier dans public/cv/).
  cvHref: string;
}

export const positionings: Record<Focus, Positioning> = {
  "dev-produit": {
    primaryTrack: "dev",
    cvHref: "/cv/yoan-hernalesteen-cv-developpeur.pdf",
  },
  po: {
    primaryTrack: "produit",
    cvHref: "/cv/yoan-hernalesteen-cv-product-owner.pdf",
  },
};

// Page de profil propre à chaque angle.
export const profilePaths: Record<Focus, string> = {
  "dev-produit": "/dev",
  po: "/produit",
};

// L'angle d'une page de profil (/dev, /produit), ou undefined ailleurs.
export function focusForPath(pathname: string): Focus | undefined {
  return FOCUSES.find(
    (focus) =>
      pathname === profilePaths[focus] ||
      pathname.startsWith(`${profilePaths[focus]}/`),
  );
}
