import { fr } from "./fr";
import type { Dictionary, Lang } from "./types";

// V1 en français uniquement. Quand l'anglais arrivera, la langue sera
// déduite de l'URL (/en/...) au lieu de cette constante.
export const LANG: Lang = "fr";

export const dictionaries: Record<Lang, Dictionary> = { fr };

export const t = dictionaries[LANG];
