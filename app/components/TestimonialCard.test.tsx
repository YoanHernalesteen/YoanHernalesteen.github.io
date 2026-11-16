import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Testimonial } from "~/content/testimonials";

import { TestimonialCard } from "./TestimonialCard";

const long: Testimonial = {
  role: { fr: "CTO · Entreprise" },
  relation: { fr: "a encadré Yoan" },
  paragraphs: { fr: ["Premier paragraphe.", "Phrase clé. Suite."] },
  translatedFrom: "en",
  original: ["First paragraph.", "Key sentence. More."],
  highlights: { accueil: { fr: "Phrase clé." } },
};

const short: Testimonial = {
  role: { fr: "Consultant" },
  paragraphs: { fr: ["Phrase clé."] },
  highlights: { accueil: { fr: "Phrase clé." } },
};

describe("TestimonialCard", () => {
  it("affiche la phrase mise en avant et le poste, sans nom", () => {
    render(
      <TestimonialCard testimonial={long} highlight={{ fr: "Phrase clé." }} />,
    );

    expect(screen.getByText("Phrase clé.")).toBeInTheDocument();
    expect(screen.getByText(/CTO · Entreprise/)).toBeInTheDocument();
    expect(screen.getByText(/a encadré Yoan/)).toBeInTheDocument();
  });

  it("propose le texte complet, la traduction et l'original en anglais", () => {
    render(
      <TestimonialCard testimonial={long} highlight={{ fr: "Phrase clé." }} />,
    );

    expect(
      screen.getByText("Lire la recommandation complète"),
    ).toBeInTheDocument();
    expect(screen.getByText("Premier paragraphe.")).toBeInTheDocument();
    expect(screen.getByText(/Traduit de l'anglais/)).toBeInTheDocument();
    // L'original est balisé en anglais pour les lecteurs d'écran.
    expect(
      screen.getByText("First paragraph.").closest("[lang]"),
    ).toHaveAttribute("lang", "en");
  });

  it("ne propose pas de dépliage quand la phrase est tout le texte", () => {
    render(
      <TestimonialCard testimonial={short} highlight={{ fr: "Phrase clé." }} />,
    );

    expect(
      screen.queryByText("Lire la recommandation complète"),
    ).not.toBeInTheDocument();
  });
});
