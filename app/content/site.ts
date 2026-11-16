// Informations publiques affichées sur le site.
export const site = {
  name: "Yoan Hernalesteen",
  // TODO : adresse dédiée au portfolio (elle sera publique et indexée)
  email: "TODO@exemple.com",
  github: "https://github.com/YoanHernalesteen",
  repository: "https://github.com/YoanHernalesteen/YoanHernalesteen.github.io",
  linkedin: "https://www.linkedin.com/in/yoanhernalesteen",
  mobygames:
    "https://www.mobygames.com/person/395069/yoan-hernalesteen/credits/",
  // Fixe plutôt que calculée : évite un écart entre le HTML prérendu et le navigateur.
  copyrightYear: 2026,
  employers: ["Ubisoft", "Gameloft", "Don't Nod", "Ninja Theory", "Ellii"],
} as const;
