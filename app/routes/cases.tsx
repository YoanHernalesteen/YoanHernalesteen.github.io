import { CaseFilter } from "~/components/CaseFilter";
import { cases, sortCasesForTrack } from "~/content/cases";
import { FOCUS, positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { t } from "~/i18n";

import type { Route } from "./+types/cases";

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${t.cases.title} · ${site.name}` },
    { name: "description", content: t.cases.intro },
  ];
}

export default function Cases() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.cases.title}
      </h1>
      <p className="mt-4 mb-8 text-lg text-gray-700 dark:text-gray-300">
        {t.cases.intro}
      </p>
      <CaseFilter
        cases={sortCasesForTrack(cases, positionings[FOCUS].primaryTrack)}
      />
    </>
  );
}
