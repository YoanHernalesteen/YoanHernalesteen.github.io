import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { fr } from "~/i18n/fr";

import { FOCUS, FOCUSES, focusForPath, positionings } from "./positioning";

describe("focusForPath", () => {
  it("reconnaît les pages de profil", () => {
    expect(focusForPath("/dev")).toBe("dev-produit");
    expect(focusForPath("/produit")).toBe("pm");
    expect(focusForPath("/produit/")).toBe("pm");
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

    expect(["dev", "produit"]).toContain(primaryTrack);
    expect(cvHref).toMatch(/^\/cv\/.+\.pdf$/);
    expect(fr.header.cvByFocus[focus].trim()).not.toBe("");
  });

  it.each(FOCUSES)("le CV de l'angle « %s » existe dans public/", (focus) => {
    // /cv/x.pdf est servi depuis public/cv/x.pdf : sans le fichier, le
    // bouton de téléchargement mènerait à une page introuvable.
    const file = path.join("public", positionings[focus].cvHref);

    expect(existsSync(file), file).toBe(true);
  });

  it("garde l'ancienne adresse du CV produit, avec le CV à jour", () => {
    // Adresse déjà envoyée en candidature : elle doit donner le même CV.
    const current = path.join("public", positionings.pm.cvHref);
    const previous = "public/cv/yoan-hernalesteen-cv-product-owner.pdf";

    expect(readFileSync(previous).equals(readFileSync(current))).toBe(true);
  });
});
