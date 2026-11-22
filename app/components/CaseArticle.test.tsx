import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { CaseArticle } from "~/components/CaseArticle";
import { cases, getCase, nextCase, type CaseStudy } from "~/content/cases";
import { testimonialsForCase } from "~/content/testimonials";
import { t } from "~/i18n";

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
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(
      0,
    );
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
    const study = requireCase("media-trackr");
    if (!study.cover) throw new Error("media-trackr devrait avoir un visuel");

    renderArticle({ ...study, cover: undefined });

    expect(
      screen.getByRole("heading", { level: 1, name: study.title.fr }),
    ).toBeInTheDocument();
    // Les captures du texte restent : seul le visuel d'en-tête disparaît.
    expect(
      screen.queryByRole("img", { name: study.cover.alt.fr }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Visuel du projet/)).not.toBeInTheDocument();
  });

  it("affiche les recommandations liées au cas", () => {
    const study = requireCase("ellii-refonte-tests-seniors");
    const linked = testimonialsForCase(study.slug);
    expect(linked.length).toBeGreaterThan(0);

    renderArticle(study);

    const section = screen.getByRole("region", {
      name: t.cases.testimonialsTitle,
    });
    expect(
      Array.from(section.querySelectorAll("blockquote")).map(
        (quote) => quote.textContent,
      ),
    ).toEqual(linked.map(({ highlight }) => highlight.fr));
  });

  it("n'affiche pas de section de recommandations vide", () => {
    const study = requireCase("media-trackr");
    expect(testimonialsForCase(study.slug)).toEqual([]);

    renderArticle(study);

    expect(
      screen.queryByRole("region", { name: t.cases.testimonialsTitle }),
    ).not.toBeInTheDocument();
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
