import { readdirSync } from "node:fs";

import type { Config } from "@react-router/dev/config";

// Slugs des études de cas, lus depuis les noms des fichiers MDX.
// Ce fichier est chargé par Node avant Vite : il ne peut pas importer
// app/content/cases.ts, qui utilise l'alias ~/ et importe des images.
// Un test vérifie qu'il y a exactement un fichier MDX par cas.
const caseSlugs = readdirSync("app/content/cases/fr")
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => file.replace(/\.mdx$/, ""));

export default {
  // Site statique (GitHub Pages) : pas de serveur, chaque page est
  // prérendue en HTML au moment du build.
  ssr: false,
  // Les pages fixes + une page par étude de cas.
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...caseSlugs.map((slug) => `/cas/${slug}`)];
  },
} satisfies Config;
