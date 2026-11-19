import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId } from "react";

import type { Testimonial } from "~/content/testimonials";
import { LANG, t } from "~/i18n";
import type { Localized } from "~/i18n/types";

interface Props {
  testimonial: Testimonial;
  // Phrase mise en avant sur la page qui affiche la carte.
  highlight: Localized;
  // État déplié, piloté par le parent (TestimonialList) : toutes les cartes
  // d'une même section s'ouvrent et se ferment ensemble.
  expanded: boolean;
  onToggle: () => void;
  // « large » : une seule recommandation en pleine largeur (pages de profil).
  size?: "default" | "large";
  // Cartes côte à côte (accueil) : à partir de la tablette, leurs lignes
  // s'alignent d'une carte à l'autre grâce à une sous-grille.
  aligned?: boolean;
}

const sizes = {
  default: {
    figure: "rounded-xl p-7",
    quote: "text-[17px] leading-[1.6]",
  },
  large: {
    figure: "rounded-2xl p-7 md:p-10",
    quote:
      "max-w-[900px] font-display text-xl leading-[1.4] font-medium md:text-[26px]",
  },
} as const;

export function TestimonialCard({
  testimonial,
  highlight,
  expanded,
  onToggle,
  size = "default",
  aligned = false,
}: Props) {
  const contentId = useId();
  const paragraphs = testimonial.paragraphs[LANG];
  // Pas de dépliage si la phrase mise en avant est déjà tout le texte.
  const hasMore = paragraphs.join(" ") !== highlight[LANG];
  const style = sizes[size];

  return (
    // Par défaut, une simple colonne. Avec `aligned`, à partir de la tablette,
    // la carte devient une sous-grille de 4 lignes (citation, bouton, texte
    // déplié, signature), partagées avec les cartes voisines : chaque ligne
    // prend la hauteur de la plus grande, tout reste aligné.
    <figure
      className={`m-0 flex min-w-0 flex-col border border-line bg-surface ${aligned ? "md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-0" : ""} ${style.figure}`}
    >
      {/* Guillemets ajoutés en CSS : le texte reste celui de la personne. */}
      <blockquote
        className={`m-0 pb-3 before:mr-1 before:content-['«'] after:ml-1 after:content-['»'] ${style.quote}`}
      >
        {highlight[LANG]}
      </blockquote>

      {/* Lignes 2 et 3 : bouton et texte déplié. Une carte sans texte de plus
          garde deux cases vides, pour rester alignée sur les autres. */}
      {hasMore ? (
        <>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={onToggle}
            className="flex min-h-11 items-center gap-2 self-start justify-self-start text-[15px] font-semibold text-ink"
          >
            {expanded ? t.testimonial.hideFull : t.testimonial.readFull}
            <FontAwesomeIcon
              icon={faChevronDown}
              aria-hidden="true"
              className={`text-[13px] transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
            />
          </button>
          {/* Animation fluide de la hauteur : la ligne de la grille passe de
              0fr (rien) à 1fr (toute la hauteur du contenu). inert retire le
              texte replié de la navigation au clavier et des lecteurs d'écran. */}
          <div
            id={contentId}
            inert={!expanded}
            className={`grid self-start text-[15px] leading-[1.6] text-body transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3 pt-2">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div />
          <div />
        </>
      )}

      <figcaption className="pt-3 text-sm leading-normal text-muted">
        <strong className="text-ink">{testimonial.role[LANG]}</strong>
        {testimonial.relation && <> · {testimonial.relation[LANG]}</>}
        {testimonial.translatedFrom && (
          <span className="mt-1 block font-mono text-xs text-subtle">
            {t.testimonial.translatedFrom}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
