import { positionings, type Focus } from "~/content/positioning";
import { site } from "~/content/site";
import { t } from "~/i18n";

interface Props {
  title: string;
  lede?: string;
  // CV proposés, dans l'ordre d'affichage.
  cvs: readonly Focus[];
}

// Bandeau sombre de fin de page. Cible des liens « Contact » (#contact).
export function ContactSection({ title, lede, cvs }: Props) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-4 bg-night text-night-ink"
    >
      <div className="page flex flex-wrap justify-between gap-12 py-16 md:py-24">
        <div className="min-w-0 flex-[1_1_480px]">
          <h2
            id="contact-title"
            className="font-display text-3xl leading-tight font-bold md:text-[44px]"
          >
            {title}
          </h2>
          {lede && (
            <p className="mt-5 text-lg leading-[1.6] text-night-muted">
              {lede}
            </p>
          )}
        </div>
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3">
          {cvs.map((focus) => (
            <a
              key={focus}
              href={positionings[focus].cvHref}
              className="flex min-h-13 items-center justify-between rounded-[10px] bg-night-ink px-5 font-semibold text-night hover:opacity-90"
            >
              {t.header.cvByFocus[focus]}
              <span className="font-mono text-xs opacity-70">
                {t.contact.pdf}
              </span>
            </a>
          ))}
          <div className="mt-3 flex flex-wrap gap-6 text-[15px]">
            <a href={site.linkedin} className="underline">
              LinkedIn
            </a>
            <a href={site.github} className="underline">
              GitHub
            </a>
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
