import { describe, expect, it } from "vitest";

import { cases } from "~/content/cases";

import {
  absoluteUrl,
  buildRobots,
  buildSitemap,
  pageMeta,
  sitemapPaths,
} from "./seo";

describe("absoluteUrl", () => {
  it("donne l'adresse complète de l'accueil", () => {
    expect(absoluteUrl("/")).toBe("https://yoanhernalesteen.com/");
  });

  it("ajoute la barre finale servie par GitHub Pages", () => {
    expect(absoluteUrl("/dev")).toBe("https://yoanhernalesteen.com/dev/");
    expect(absoluteUrl("/cas/media-trackr/")).toBe(
      "https://yoanhernalesteen.com/cas/media-trackr/",
    );
  });
});

describe("pageMeta", () => {
  const meta = pageMeta({
    title: "Titre",
    description: "Description",
    path: "/dev",
  });

  it("donne le titre, la description et l'aperçu des réseaux sociaux", () => {
    expect(meta).toContainEqual({ title: "Titre" });
    expect(meta).toContainEqual({
      name: "description",
      content: "Description",
    });
    expect(meta).toContainEqual({ property: "og:title", content: "Titre" });
    expect(meta).toContainEqual({
      property: "og:description",
      content: "Description",
    });
  });

  it("donne l'adresse canonique et og:url", () => {
    const url = "https://yoanhernalesteen.com/dev/";

    expect(meta).toContainEqual({ property: "og:url", content: url });
    expect(meta).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: url,
    });
  });

  it("peut demander aux moteurs de ne pas indexer la page", () => {
    const hidden = pageMeta({
      title: "T",
      description: "D",
      path: "/mentions-legales",
      noindex: true,
    });

    expect(hidden).toContainEqual({ name: "robots", content: "noindex" });
  });
});

describe("le sitemap", () => {
  it("liste les pages publiques et chaque étude de cas", () => {
    const paths = sitemapPaths();

    expect(paths).toEqual(
      expect.arrayContaining(["/", "/dev", "/produit", "/cas"]),
    );
    for (const study of cases) {
      expect(paths).toContain(`/cas/${study.slug}`);
    }
  });

  it("n'inclut pas les mentions légales", () => {
    expect(sitemapPaths()).not.toContain("/mentions-legales");
  });

  it("produit un XML avec une adresse complète par page", () => {
    const xml = buildSitemap(["/", "/dev"]);

    expect(xml).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
    expect(xml).toContain("<loc>https://yoanhernalesteen.com/</loc>");
    expect(xml).toContain("<loc>https://yoanhernalesteen.com/dev/</loc>");
  });
});

describe("robots.txt", () => {
  it("autorise tout et indique le sitemap", () => {
    const robots = buildRobots();

    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(
      "Sitemap: https://yoanhernalesteen.com/sitemap.xml",
    );
  });
});
