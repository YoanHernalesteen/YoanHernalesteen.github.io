import { CaseFilter } from "~/components/CaseFilter";
import { cases, sortCasesForTrack } from "~/content/cases";
import { FOCUS, positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/cases";

export function meta(): Route.MetaDescriptors {
  const title = `${t.cases.metaTitle} · ${site.name}`;
  return pageMeta({ title, description: t.cases.intro, path: "/cas" });
}

export default function Cases() {
  return (
    <div className="page pt-16 pb-24 md:pt-18">
      <p className="eyebrow">{t.cases.eyebrow}</p>
      <h1 className="mt-2 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.1] font-bold">
        {t.cases.title}
      </h1>
      <p className="mt-4 mb-8 max-w-[680px] text-lg leading-[1.6] text-muted">
        {t.cases.intro}
      </p>
      {/* Les cas de l'angle actif (FOCUS) d'abord. */}
      <CaseFilter
        cases={sortCasesForTrack(cases, positionings[FOCUS].primaryTrack)}
      />
    </div>
  );
}
