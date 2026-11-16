import { describe, expect, it } from "vitest";

import { fr } from "~/i18n/fr";

import { FOCUS, FOCUSES, focusForPath, positionings } from "./positioning";

describe("focusForPath", () => {
  it("reconnaît les pages de profil", () => {
    expect(focusForPath("/dev")).toBe("dev-produit");
    expect(focusForPath("/produit")).toBe("po");
    expect(focusForPath("/produit/")).toBe("po");
  });

  it("renvoie undefined ailleurs, même pour un chemin qui commence pareil", () => {
    expect(focusForPath("/")).toBeUndefined();
    expect(focusForPath("/cas")).toBeUndefined();
    expect(focusForPath("/devis")).toBeUndefined();
  });
});

describe("le positionnement", () => {
  it("a un angle actif parmi les angles connus", () => {
    expect(FOCUSES).toContain(FOCUS);
  });

  it.each(FOCUSES)("l'angle « %s » est complet", (focus) => {
    const { primaryTrack, cvHref } = positionings[focus];
    const door = fr.doors[focus];

    expect(["dev", "produit"]).toContain(primaryTrack);
    expect(cvHref).toMatch(/^\/cv\/.+\.pdf$/);
    expect(fr.header.cvByFocus[focus].trim()).not.toBe("");
    expect(door.title.trim()).not.toBe("");
    expect(door.text.trim()).not.toBe("");
    expect(door.cta.trim()).not.toBe("");
    expect(door.chips.length).toBeGreaterThan(0);
  });
});
