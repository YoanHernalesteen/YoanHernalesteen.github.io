import { Link } from "react-router";

import type { CaseStudy } from "~/content/cases";
import { LANG, t } from "~/i18n";

import { TrackBadge } from "./TrackBadge";

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    // relative : sert de cadre au lien étiré du titre (voir plus bas).
    <article className="relative flex min-w-0 flex-col gap-3.5 rounded-xl border border-line bg-surface p-6 transition-shadow focus-within:ring-2 focus-within:ring-dev hover:shadow-md">
      {/* alt="" : le titre nomme déjà le lien, l'image de la carte est
          décorative. lazy : chargée seulement à l'approche de l'écran. */}
      {study.cover && (
        <img
          src={study.cover.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5">
          {study.tracks.map((track) => (
            <TrackBadge key={track} track={track} />
          ))}
        </div>
        <span className="font-mono text-xs text-subtle">
          {study.year[LANG]}
        </span>
      </div>

      <h3 className="font-display text-[22px] leading-tight font-bold">
        {/* Lien étiré : son ::after couvre toute la carte, qui devient
            cliquable, mais le lien n'est nommé que par le titre. */}
        <Link
          to={`/cas/${study.slug}`}
          className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none"
        >
          {study.title[LANG]}
        </Link>
      </h3>

      <p className="text-[15px] leading-[1.55] text-muted">
        {study.summary[LANG]}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5">
        {study.tags[LANG].map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-chip px-2 py-1 text-xs text-body"
          >
            {tag}
          </li>
        ))}
      </ul>

      <span aria-hidden="true" className="text-sm font-semibold">
        {t.cases.readCase}
      </span>
    </article>
  );
}
