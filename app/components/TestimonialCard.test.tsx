import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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

const highlight = { fr: "Phrase clé." };

describe("TestimonialCard", () => {
  it("affiche la phrase mise en avant et le poste, sans nom", () => {
    render(
      <TestimonialCard
        testimonial={long}
        highlight={highlight}
        expanded={false}
        onToggle={() => {}}
      />,
    );

    expect(screen.getByText("Phrase clé.")).toBeInTheDocument();
    expect(screen.getByText(/CTO · Entreprise/)).toBeInTheDocument();
    expect(screen.getByText(/a encadré Yoan/)).toBeInTheDocument();
  });

  it("garde le texte complet replié et hors de portée tant qu'il est fermé", () => {
    render(
      <TestimonialCard
        testimonial={long}
        highlight={highlight}
        expanded={false}
        onToggle={() => {}}
      />,
    );

    const button = screen.getByRole("button", {
      name: "Lire la recommandation complète",
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
    // inert : ni clavier ni lecteur d'écran n'atteignent le texte replié.
    expect(
      screen.getByText("Premier paragraphe.").closest("[inert]"),
    ).not.toBeNull();
  });

  it("affiche le texte complet en français une fois déplié", () => {
    render(
      <TestimonialCard
        testimonial={long}
        highlight={highlight}
        expanded
        onToggle={() => {}}
      />,
    );

    const button = screen.getByRole("button", {
      name: "Masquer la recommandation complète",
    });
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText("Premier paragraphe.").closest("[inert]"),
    ).toBeNull();
    // On signale la traduction, mais on n'affiche que la version française.
    expect(screen.getByText(/Traduit de l'anglais/)).toBeInTheDocument();
    expect(screen.queryByText("First paragraph.")).not.toBeInTheDocument();
  });

  it("prévient son parent quand on clique sur le bouton", () => {
    const onToggle = vi.fn();
    render(
      <TestimonialCard
        testimonial={long}
        highlight={highlight}
        expanded={false}
        onToggle={onToggle}
      />,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onToggle).toHaveBeenCalledOnce();
  });

  it("affiche le logo de l'entreprise à côté du poste, en décoration", () => {
    render(
      <TestimonialCard
        testimonial={{ ...short, logo: "/logo.webp" }}
        highlight={highlight}
        expanded={false}
        onToggle={() => {}}
      />,
    );

    const caption = screen.getByText("Consultant").closest("figcaption");
    const logo = caption?.querySelector("img");
    expect(logo).toHaveAttribute("src", "/logo.webp");
    // Le nom de l'entreprise est écrit juste à côté.
    expect(logo).toHaveAttribute("alt", "");
  });

  it("n'affiche pas d'image quand l'entreprise n'a pas de logo", () => {
    render(
      <TestimonialCard
        testimonial={short}
        highlight={highlight}
        expanded={false}
        onToggle={() => {}}
      />,
    );

    expect(document.querySelector("img")).toBeNull();
  });

  it("ne propose pas de dépliage quand la phrase est tout le texte", () => {
    render(
      <TestimonialCard
        testimonial={short}
        highlight={highlight}
        expanded={false}
        onToggle={() => {}}
      />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
