import { caseBodies } from "~/content/caseBodies";
import type { CaseStudy } from "~/content/cases";
import { LANG } from "~/i18n";

export function CaseArticle({ study }: { study: CaseStudy }) {
  // Lecture dans une table fixe : le composant n'est pas recréé à chaque rendu.
  const Body = caseBodies[`${LANG}/${study.slug}`];

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {study.title[LANG]}
      </h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        {study.summary[LANG]}
      </p>
      {Body && (
        <div className="case-body mt-8">
          <Body />
        </div>
      )}
    </article>
  );
}
