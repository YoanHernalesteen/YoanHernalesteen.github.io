import { describe, expect, it } from "vitest";

import { fr } from "~/i18n/fr";

import { FOCUS, FOCUSES, positionings } from "./positioning";

describe("le positionnement", () => {
  it("a un angle actif parmi les angles connus", () => {
    expect(FOCUSES).toContain(FOCUS);
  });

  it.each(FOCUSES)("l'angle « %s » est complet", (focus) => {
    const { primaryTrack, cvHref } = positionings[focus];
    const text = fr.positioning[focus];

    expect(["dev", "produit"]).toContain(primaryTrack);
    expect(cvHref).toMatch(/^\/cv\/.+\.pdf$/);
    expect(text.role.trim()).not.toBe("");
    expect(text.headline.trim()).not.toBe("");
    expect(text.cvLabel.trim()).not.toBe("");
    expect(text.skills.length).toBeGreaterThan(0);
  });
});
