import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { PageTestimonial, Testimonial } from "~/content/testimonials";

import { TestimonialList } from "./TestimonialList";

function makeTestimonial(role: string): PageTestimonial {
  const testimonial: Testimonial = {
    role: { fr: role },
    paragraphs: { fr: [`${role} : phrase clé.`, `${role} : suite.`] },
    highlights: { accueil: { fr: `${role} : phrase clé.` } },
  };
  return { testimonial, highlight: { fr: `${role} : phrase clé.` } };
}

const items = [makeTestimonial("CTO"), makeTestimonial("Producer")];

describe("TestimonialList", () => {
  it("déplie toutes les recommandations d'un seul clic", () => {
    render(<TestimonialList items={items} />);

    const [first] = screen.getAllByRole("button", {
      name: "Lire la recommandation complète",
    });
    fireEvent.click(first);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      expect(button).toHaveAttribute("aria-expanded", "true");
      expect(button).toHaveAccessibleName("Masquer la recommandation complète");
    }
  });

  it("les replie toutes au clic suivant", () => {
    render(<TestimonialList items={items} />);

    const [first, second] = screen.getAllByRole("button");
    fireEvent.click(first);
    fireEvent.click(second);

    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });
});
