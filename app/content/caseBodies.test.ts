import { describe, expect, it } from "vitest";

import { caseBodies } from "./caseBodies";
import { cases } from "./cases";

describe("caseBodies", () => {
  it("charge le texte de chaque étude de cas publiée", () => {
    for (const study of cases) {
      expect(caseBodies[`fr/${study.slug}`], study.slug).toBeDefined();
    }
  });

  it("n'embarque aucun brouillon dans le site", () => {
    expect(
      Object.keys(caseBodies).filter((key) => key.startsWith("brouillons/")),
    ).toEqual([]);
  });
});
