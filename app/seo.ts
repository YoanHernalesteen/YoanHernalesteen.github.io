import type { MetaDescriptor } from "react-router";

import { cases } from "~/content/cases";
import { site } from "~/content/site";

// Adresse complète d'une page. GitHub Pages sert /dev depuis dev/index.html
// et redirige /dev vers /dev/ : on écrit donc l'adresse avec la barre finale,
// celle que le visiteur voit réellement.
export function absoluteUrl(path: string): string {
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return new URL(withSlash, site.url).href;
}

interface PageMetaOptions {
  title: string;
  description: string;
  path: string;
  // Demande aux moteurs de recherche de ne pas indexer la page.
  noindex?: boolean;
}

// Balises communes à toutes les pages : titre, description, aperçu pour
// LinkedIn et les autres réseaux (Open Graph), adresse canonique.
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: PageMetaOptions): MetaDescriptor[] {
  const url = absoluteUrl(path);
  return [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: site.name },
    { property: "og:locale", content: "fr_FR" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { tagName: "link", rel: "canonical", href: url },
    ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
  ];
}

// Pages proposées aux moteurs de recherche (les mentions légales n'y sont pas).
export function sitemapPaths(): string[] {
  return ["/", "/dev", "/cas", ...cases.map((study) => `/cas/${study.slug}`)];
}

export function buildSitemap(paths: readonly string[]): string {
  // Les adresses ne contiennent que des caractères sûrs (slugs en kebab-case),
  // aucun échappement XML n'est nécessaire.
  const urls = paths
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildRobots(): string {
  return `User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", site.url).href}
`;
}
