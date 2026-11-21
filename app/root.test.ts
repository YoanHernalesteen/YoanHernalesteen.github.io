import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { links } from "./root";

describe("les icônes du site", () => {
  it("déclarent un favicon SVG, avec une version .ico de secours", () => {
    expect(links()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ rel: "icon", type: "image/svg+xml" }),
        expect.objectContaining({ rel: "icon", sizes: "any" }),
        expect.objectContaining({ rel: "apple-touch-icon" }),
      ]),
    );
  });

  it("pointent vers des fichiers qui existent dans public/", () => {
    expect(links().length).toBeGreaterThan(0);
    for (const link of links()) {
      if (!("href" in link) || !link.href) continue;
      expect(existsSync(path.join("public", link.href)), link.href).toBe(true);
    }
  });
});
