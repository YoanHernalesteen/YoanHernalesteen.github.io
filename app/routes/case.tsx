import { data } from "react-router";

import { CaseArticle } from "~/components/CaseArticle";
import { cases, getCase, nextCase } from "~/content/cases";
import { site } from "~/content/site";
import { LANG, t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/case";

// Exécuté au build, une fois par cas prérendu (voir react-router.config.ts).
export function loader({ params }: Route.LoaderArgs) {
  const study = getCase(params.slug);
  if (!study) throw data(t.notFound.title, { status: 404 });
  return study;
}

// loaderData vaut undefined quand le loader a levé une erreur (cas inconnu).
export function meta({ loaderData }: Route.MetaArgs): Route.MetaDescriptors {
  if (!loaderData) return [{ title: `${t.notFound.title} · ${site.name}` }];

  const title = `${loaderData.title[LANG]} · ${site.name}`;
  return pageMeta({
    title,
    description: loaderData.summary[LANG],
    path: `/cas/${loaderData.slug}`,
  });
}

export default function CasePage({ loaderData }: Route.ComponentProps) {
  return (
    <CaseArticle study={loaderData} next={nextCase(cases, loaderData.slug)} />
  );
}
