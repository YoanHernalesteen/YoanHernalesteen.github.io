import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { caseBodies } from "./caseBodies";
import { cases } from "./cases";

describe("caseBodies", () => {
  it("charge le texte de chaque étude de cas publiée", () => {
    for (const study of cases) {
      expect(caseBodies[`fr/${study.slug}`], study.slug).toBeDefined();
    }
  });

  it("ne publie aucun texte provisoire", () => {
    for (const study of cases) {
      const file = path.join("app/content/cases/fr", `${study.slug}.mdx`);
      const body = readFileSync(file, "utf8");

      // Sensible à la casse : le marqueur « À compléter » ouvre une phrase,
      // alors que « des encyclopédies à compléter » est du vrai texte.
      expect(body, study.slug).not.toMatch(/TODO|À compléter/);
    }
  });

  it("n'embarque aucun brouillon dans le site", () => {
    expect(
      Object.keys(caseBodies).filter((key) => key.startsWith("brouillons/")),
    ).toEqual([]);
  });
});
