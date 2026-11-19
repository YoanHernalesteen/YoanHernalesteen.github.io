import { Link } from "react-router";

import { caseBodies } from "~/content/caseBodies";
import type { CaseBrief, CaseStudy } from "~/content/cases";
import { LANG, t } from "~/i18n";

import { TrackBadge } from "./TrackBadge";

// Ordre des lignes de l'encadré « En bref ».
const BRIEF_FIELDS: readonly (keyof CaseBrief)[] = [
  "role",
  "period",
  "team",
  "tools",
  "shows",
];

interface Props {
  study: CaseStudy;
  next?: CaseStudy;
}

export function CaseArticle({ study, next }: Props) {
  // Lecture dans une table fixe : le composant n'est pas recréé à chaque rendu.
  const Body = caseBodies[`${LANG}/${study.slug}`];
  // Couleur des numéros de section : celle de la première piste du cas.
  // Passée par une variable CSS que seul le numéro utilise (voir app.css).
  const accent =
    study.tracks[0] === "produit"
      ? "[--case-accent:var(--color-produit)]"
      : "[--case-accent:var(--color-dev)]";
  const brief = study.brief[LANG];

  return (
    <article className="page pt-12 pb-24">
      <Link
        to="/cas"
        className="inline-flex min-h-11 items-center text-[15px] text-muted hover:text-ink"
      >
        {t.cases.back}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        {study.tracks.map((track) => (
          <TrackBadge key={track} track={track} />
        ))}
        <span className="font-mono text-xs text-subtle uppercase">
          {study.year[LANG]} · {study.org}
        </span>
      </div>
      <h1 className="mt-4 max-w-[900px] font-display text-[clamp(2.1rem,4.5vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.01em]">
        {study.title[LANG]}
      </h1>
      <p className="mt-5 max-w-[760px] text-lg leading-[1.6] text-muted md:text-xl">
        {study.summary[LANG]}
      </p>

      {/* Visuel principal, s'il existe. Il est en haut de page : chargé
          tout de suite, sans lazy loading. */}
      {study.cover && (
        <figure className="mt-10">
          <img
            src={study.cover.src}
            alt={study.cover.alt[LANG]}
            decoding="async"
            className="aspect-video w-full rounded-2xl border border-line object-cover"
          />
          {study.cover.credit && (
            <figcaption className="mt-2 text-sm text-subtle">
              {study.cover.credit}
            </figcaption>
          )}
        </figure>
      )}

      <div className="mt-14 flex flex-wrap items-start gap-14">
        {Body && (
          <div
            className={`case-body case-body-numbered min-w-0 flex-[999_1_560px] ${accent}`}
          >
            <Body />
          </div>
        )}

        <aside
          aria-labelledby="brief-title"
          className="min-w-0 flex-[1_1_280px] rounded-2xl border border-line bg-surface p-7 md:sticky md:top-6"
        >
          <h2 id="brief-title" className="eyebrow">
            {t.cases.brief.title}
          </h2>
          <dl className="mt-5 flex flex-col gap-4">
            {BRIEF_FIELDS.map((field) => (
              <div key={field}>
                <dt className="text-[13px] text-subtle">
                  {t.cases.brief[field]}
                </dt>
                <dd className="mt-1 text-[15px] leading-normal">
                  {brief[field]}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      {next && (
        <nav
          aria-label={t.cases.next}
          className="mt-18 flex flex-wrap justify-between gap-4 border-t border-line pt-7"
        >
          <Link
            to="/cas"
            className="inline-flex min-h-11 items-center text-muted hover:text-ink"
          >
            {t.cases.back}
          </Link>
          <Link
            to={`/cas/${next.slug}`}
            className="group inline-flex flex-col items-end gap-1 text-right"
          >
            <span className="eyebrow text-xs">{t.cases.next}</span>
            <span className="font-display text-xl font-bold group-hover:underline">
              {next.title[LANG]} →
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
