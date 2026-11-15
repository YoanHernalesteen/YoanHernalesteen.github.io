import { useState } from "react";

import { filterCases, type CaseStudy, type TrackFilter } from "~/content/cases";
import { t } from "~/i18n";

import { CaseCard } from "./CaseCard";

const FILTERS: readonly TrackFilter[] = ["tous", "dev", "produit"];

export function CaseFilter({ cases }: { cases: readonly CaseStudy[] }) {
  // useState<TrackFilter> : l'état ne peut valoir que "tous", "dev" ou "produit".
  const [filter, setFilter] = useState<TrackFilter>("tous");
  const visible = filterCases(cases, filter);

  return (
    <>
      <div role="group" aria-label={t.cases.filterLabel} className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-sm aria-pressed:border-indigo-700 aria-pressed:bg-indigo-700 aria-pressed:text-white dark:border-gray-700 dark:aria-pressed:border-indigo-300 dark:aria-pressed:bg-indigo-300 dark:aria-pressed:text-gray-950"
          >
            {t.tracks[f]}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {visible.map((study) => (
          <CaseCard key={study.slug} study={study} />
        ))}
      </div>
    </>
  );
}
