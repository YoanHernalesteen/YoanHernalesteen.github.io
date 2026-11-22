import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { cases } from "~/content/cases";

import {
  absoluteUrl,
  buildRobots,
  buildSitemap,
  ogImage,
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

  it("donne l'image d'aperçu en adresse complète, avec ses dimensions et un texte alternatif", () => {
    const image = meta.find(
      (tag) => "property" in tag && tag.property === "og:image",
    );

    expect(image).toEqual({
      property: "og:image",
      content: "https://yoanhernalesteen.com/og-image.png",
    });
    expect(meta).toContainEqual({
      property: "og:image:width",
      content: "1200",
    });
    expect(meta).toContainEqual({
      property: "og:image:height",
      content: "627",
    });
    expect(meta).toContainEqual(
      expect.objectContaining({ property: "og:image:alt" }),
    );
    expect(meta).toContainEqual({
      name: "twitter:card",
      content: "summary_large_image",
    });
  });

  it("annonce les dimensions réelles du fichier de l'image d'aperçu", () => {
    // Dans un PNG, la largeur et la hauteur sont aux octets 16 à 23.
    const png = readFileSync(path.join("public", ogImage.path));

    expect(png.readUInt32BE(16)).toBe(ogImage.width);
    expect(png.readUInt32BE(20)).toBe(ogImage.height);
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
  it("ne propose pas /produit, qui redirige vers l'accueil", () => {
    expect(sitemapPaths()).not.toContain("/produit");
  });

  it("liste les pages publiques et chaque étude de cas", () => {
    const paths = sitemapPaths();

    expect(paths).toEqual(expect.arrayContaining(["/", "/dev", "/cas"]));
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
