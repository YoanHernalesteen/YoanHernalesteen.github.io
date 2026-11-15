// Un fichier .mdx importé est un composant React sans props obligatoires.
declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXContent: ComponentType;
  export default MDXContent;
}
