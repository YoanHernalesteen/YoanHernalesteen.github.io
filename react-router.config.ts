import type { Config } from "@react-router/dev/config";

import { cases } from "./app/content/cases";

export default {
  // Site statique (GitHub Pages) : pas de serveur, chaque page est
  // prérendue en HTML au moment du build.
  ssr: false,
  // Les pages fixes + une page par étude de cas.
  async prerender({ getStaticPaths }) {
    return [...getStaticPaths(), ...cases.map((c) => `/cas/${c.slug}`)];
  },
} satisfies Config;
