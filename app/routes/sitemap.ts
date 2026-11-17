import { buildSitemap, sitemapPaths } from "~/seo";

// Route « ressource » : pas de composant, le loader renvoie directement
// le fichier. Avec le prérendu, il devient build/client/sitemap.xml.
export function loader() {
  return new Response(buildSitemap(sitemapPaths()), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
