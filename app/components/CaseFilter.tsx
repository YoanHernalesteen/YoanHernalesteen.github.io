import { useState } from "react";

import { filterCases, type CaseStudy, type TrackFilter } from "~/content/cases";
import { t } from "~/i18n";

import { CaseCard } from "./CaseCard";

const FILTERS: readonly TrackFilter[] = ["tous", "dev", "produit"];

export function CaseFilter({ cases }: { cases: readonly CaseStudy[] }) {
  const [filter, setFilter] = useState<TrackFilter>("tous");
  const visible = filterCases(cases, filter);

  return (
    <>
      <div
        role="group"
        aria-label={t.cases.filterLabel}
        className="flex flex-wrap items-center gap-2.5"
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="min-h-11 rounded-full border border-line-strong bg-surface px-[18px] text-[15px] font-semibold text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg"
          >
            {t.cases.filters[f]} · {filterCases(cases, f).length}
          </button>
        ))}
      </div>

      {/* role="status" : les lecteurs d'écran annoncent le nouveau nombre
          de résultats à chaque changement de filtre. */}
      <p role="status" className="sr-only">
        {t.cases.resultCount(visible.length)}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((study) => (
          <CaseCard key={study.slug} study={study} />
        ))}
      </div>
    </>
  );
}
