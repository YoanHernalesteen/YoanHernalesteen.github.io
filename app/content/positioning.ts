// Les deux profils : le site met en avant le profil Product Manager (« pm »),
// le profil développeur a sa page /dev.
export const FOCUSES = ["dev-produit", "pm"] as const;
export type Focus = (typeof FOCUSES)[number];

interface Positioning {
  // CV du profil (fichier dans public/cv/).
  cvHref: string;
}

export const positionings: Record<Focus, Positioning> = {
  "dev-produit": {
    cvHref: "/cv/yoan-hernalesteen-cv-developpeur.pdf",
  },
  pm: {
    cvHref: "/cv/yoan-hernalesteen-cv-product-manager.pdf",
  },
};
