import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import type { CaseStudy } from "~/content/cases";
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

function renderCard(card: CaseStudy = study) {
  const Stub = createRoutesStub([
    { path: "/", Component: () => <CaseCard study={card} /> },
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

  it("n'affiche ni image ni emplacement vide sans visuel", () => {
    renderCard();

    expect(document.querySelector("img")).toBeNull();
    expect(screen.queryByText(/Visuel du projet/)).not.toBeInTheDocument();
  });

  it("affiche le visuel du cas, décoratif sur la carte", () => {
    renderCard({
      ...study,
      cover: { src: "/cover.webp", alt: { fr: "Capture de l'app" } },
    });

    const image = document.querySelector("img");
    expect(image).toHaveAttribute("src", "/cover.webp");
    // Le titre nomme déjà le lien : l'image de la carte est décorative.
    expect(image).toHaveAttribute("alt", "");
  });
});
