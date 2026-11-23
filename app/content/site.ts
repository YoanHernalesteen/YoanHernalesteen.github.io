// Informations publiques affichées sur le site.
export const site = {
  name: "Yoan Hernalesteen",
  // Poste recherché, repris dans la fiche Person (JSON-LD) de l'accueil.
  jobTitle: "Product Manager",
  // Adresse publique du site (domaine acheté chez Cloudflare).
  url: "https://yoanhernalesteen.com",
  // Adresse dédiée au portfolio (Cloudflare Email Routing) : publique et indexée.
  email: "contact@yoanhernalesteen.com",
  github: "https://github.com/YoanHernalesteen",
  repository: "https://github.com/YoanHernalesteen/YoanHernalesteen.github.io",
  linkedin: "https://www.linkedin.com/in/yoanhernalesteen",
  mobygames:
    "https://www.mobygames.com/person/395069/yoan-hernalesteen/credits/",
  // Fixe plutôt que calculée : évite un écart entre le HTML prérendu et le navigateur.
  copyrightYear: 2026,
  employers: ["Ubisoft", "Gameloft", "Don't Nod", "Ninja Theory", "Ellii"],
} as const;
