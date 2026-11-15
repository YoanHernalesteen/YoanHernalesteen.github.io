import { Link } from "react-router";

import type { CaseStudy } from "~/content/cases";
import { LANG, t } from "~/i18n";

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="rounded-lg border border-gray-200 p-5 dark:border-gray-800">
      <h3 className="text-lg font-semibold">
        <Link
          to={`/cas/${study.slug}`}
          className="underline-offset-4 hover:underline"
        >
          {study.title[LANG]}
        </Link>
      </h3>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {study.summary[LANG]}
      </p>
      <ul className="mt-3 flex gap-2" aria-label="Pistes">
        {study.tracks.map((track) => (
          <li
            key={track}
            className="rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            {t.tracks[track]}
          </li>
        ))}
      </ul>
    </article>
  );
}
