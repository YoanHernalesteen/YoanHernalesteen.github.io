import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getCase } from "~/content/cases";
import { CaseArticle } from "~/components/CaseArticle";

describe("CaseArticle", () => {
  it("affiche le titre et le texte MDX du cas", () => {
    const study = getCase("media-trackr");
    if (!study) throw new Error("cas media-trackr introuvable");

    render(<CaseArticle study={study} />);

    expect(
      screen.getByRole("heading", { level: 1, name: study.title.fr }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "En bref" }),
    ).toBeInTheDocument();
  });
});
