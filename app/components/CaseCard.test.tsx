import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { makeCase } from "~/test/makeCase";

import { CaseCard } from "./CaseCard";

const study = makeCase({
  slug: "media-trackr",
  title: { fr: "Media Trackr" },
  summary: { fr: "Une app Rails." },
  tracks: ["dev", "produit"],
  year: { fr: "2025" },
  tags: { fr: ["Ruby on Rails", "OpenAI"] },
});

function renderCard() {
  const Stub = createRoutesStub([
    { path: "/", Component: () => <CaseCard study={study} /> },
  ]);
  render(<Stub />);
}

describe("CaseCard", () => {
  it("a un seul lien, nommé par le titre, vers la page du cas", () => {
    renderCard();

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("Media Trackr");
    expect(links[0]).toHaveAttribute("href", "/cas/media-trackr");
  });

  it("affiche les pistes, l'année, le résumé et les mots-clés", () => {
    renderCard();

    expect(screen.getByText("Dev")).toBeInTheDocument();
    expect(screen.getByText("Produit")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("Une app Rails.")).toBeInTheDocument();
    expect(screen.getByText("Ruby on Rails")).toBeInTheDocument();
    expect(screen.getByText("OpenAI")).toBeInTheDocument();
  });
});
