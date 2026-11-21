import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { fr } from "~/i18n/fr";

import { FOCUSES, positionings } from "./positioning";

describe("les CV", () => {
  it.each(FOCUSES)("le CV « %s » a un nom et une adresse en PDF", (focus) => {
    expect(positionings[focus].cvHref).toMatch(/^\/cv\/.+\.pdf$/);
    expect(fr.header.cvByFocus[focus].trim()).not.toBe("");
  });

  it.each(FOCUSES)("le CV « %s » existe dans public/", (focus) => {
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
