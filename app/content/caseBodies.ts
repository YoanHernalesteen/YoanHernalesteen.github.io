import type { ComponentType } from "react";

// Charge tous les textes MDX au build. `eager: true` les inclut directement
// dans le bundle : avec 4 à 6 cas, c'est plus simple qu'un chargement différé.
// Le paramètre de type <…> décrit ce que contient chaque module importé.
const modules = import.meta.glob<{ default: ComponentType }>(
  "./cases/*/*.mdx",
  { eager: true },
);

// Table construite une seule fois, au chargement du module :
// clé "<langue>/<slug>" → composant MDX. Ex. : "fr/media-trackr".
export const caseBodies: Readonly<Record<string, ComponentType>> =
  Object.fromEntries(
    Object.entries(modules).map(([path, mod]) => [
      path.replace("./cases/", "").replace(".mdx", ""),
      mod.default,
    ]),
  );
