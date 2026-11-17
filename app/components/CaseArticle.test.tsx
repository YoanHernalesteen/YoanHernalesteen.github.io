import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { CaseArticle } from "~/components/CaseArticle";
import { cases, getCase, nextCase, type CaseStudy } from "~/content/cases";

function requireCase(slug: string): CaseStudy {
  const study = getCase(slug);
  if (!study) throw new Error(`cas ${slug} introuvable`);
  return study;
}

function renderArticle(study: CaseStudy) {
  // L'article contient des liens : il a besoin d'un routeur.
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <CaseArticle study={study} next={nextCase(cases, study.slug)} />
      ),
    },
  ]);
  render(<Stub />);
}

describe("CaseArticle", () => {
  it("affiche le titre et le texte MDX du cas", () => {
    const study = requireCase("media-trackr");

    renderArticle(study);

    expect(
      screen.getByRole("heading", { level: 1, name: study.title.fr }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Le contexte" }),
    ).toBeInTheDocument();
  });

  it("affiche l'année et l'entreprise", () => {
    const study = requireCase("media-trackr");

    renderArticle(study);

    expect(
      screen.getByText(`${study.year.fr} · ${study.org}`),
    ).toBeInTheDocument();
  });

  it("résume le cas dans l'encadré « En bref »", () => {
    const study = requireCase("media-trackr");

    renderArticle(study);

    const aside = screen.getByRole("complementary", { name: "En bref" });
    for (const value of Object.values(study.brief.fr)) {
      expect(within(aside).getByText(value)).toBeInTheDocument();
    }
  });

  it("propose l'étude de cas suivante", () => {
    const study = requireCase("media-trackr");
    const next = nextCase(cases, study.slug);
    if (!next) throw new Error("pas de cas suivant");

    renderArticle(study);

    expect(
      screen.getByRole("link", { name: new RegExp(next.title.fr) }),
    ).toHaveAttribute("href", `/cas/${next.slug}`);
  });

  it("n'affiche pas d'emplacement vide quand le cas n'a pas de visuel", () => {
    renderArticle({ ...requireCase("media-trackr"), cover: undefined });

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByText(/Visuel du projet/)).not.toBeInTheDocument();
  });

  it("affiche le visuel du cas avec son texte alternatif", () => {
    renderArticle({
      ...requireCase("media-trackr"),
      cover: { src: "/cover.webp", alt: { fr: "Capture de l'app" } },
    });

    expect(
      screen.getByRole("img", { name: "Capture de l'app" }),
    ).toHaveAttribute("src", "/cover.webp");
  });
});
