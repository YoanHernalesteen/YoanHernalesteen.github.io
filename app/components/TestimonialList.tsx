import { useState } from "react";

import type { PageTestimonial } from "~/content/testimonials";
import { LANG } from "~/i18n";

import { TestimonialCard } from "./TestimonialCard";

interface Props {
  items: readonly PageTestimonial[];
  size?: "default" | "large";
  // Disposition des cartes.
  className?: string;
  // Cartes côte à côte : aligne leurs lignes (citation, bouton, texte,
  // signature). La grille parente doit alors avoir plusieurs colonnes et
  // aucun espacement vertical à partir de la tablette (md:gap-y-0).
  alignRows?: boolean;
}

// Les recommandations d'une section. L'état déplié est partagé : un clic
// sur n'importe quelle carte ouvre ou ferme toutes les cartes à la fois.
export function TestimonialList({
  items,
  size = "default",
  className = "grid gap-6",
  alignRows = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={className}>
      {items.map(({ testimonial, highlight }) => (
        <TestimonialCard
          key={testimonial.role[LANG] + highlight[LANG]}
          testimonial={testimonial}
          highlight={highlight}
          expanded={expanded}
          onToggle={() => setExpanded((value) => !value)}
          size={size}
          aligned={alignRows}
        />
      ))}
    </div>
  );
}
