import type { Testimonial } from "~/content/testimonials";
import { LANG, t } from "~/i18n";
import type { Localized } from "~/i18n/types";

interface Props {
  testimonial: Testimonial;
  // Phrase mise en avant sur la page qui affiche la carte.
  highlight: Localized;
}

export function TestimonialCard({ testimonial, highlight }: Props) {
  const paragraphs = testimonial.paragraphs[LANG];
  // Pas de dépliage si la phrase mise en avant est déjà tout le texte.
  const hasMore = paragraphs.join(" ") !== highlight[LANG];

  return (
    <figure className="m-0 flex min-w-0 flex-[1_1_320px] flex-col gap-5 rounded-xl border border-line bg-surface p-7">
      {/* Guillemets ajoutés en CSS : le texte reste celui de la personne.
          flex-1 : la citation prend la place libre et pousse le dépliage
          et la signature en bas de la carte. */}
      <blockquote className="m-0 flex-1 text-[17px] leading-[1.6] before:mr-1 before:content-['«'] after:ml-1 after:content-['»']">
        {highlight[LANG]}
      </blockquote>

      {hasMore && (
        <details className="text-[15px] leading-[1.6] text-body">
          <summary className="flex min-h-11 cursor-pointer items-center font-semibold text-ink">
            {t.testimonial.readFull}
          </summary>
          <div className="mt-2 flex flex-col gap-3">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {testimonial.original && (
            <div className="mt-5 border-t border-line pt-4">
              <p className="eyebrow">{t.testimonial.original}</p>
              {/* lang="en" : les lecteurs d'écran lisent l'original avec la bonne prononciation. */}
              <div lang="en" className="mt-2 flex flex-col gap-3">
                {testimonial.original.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </details>
      )}

      <figcaption className="text-sm leading-normal text-muted">
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
