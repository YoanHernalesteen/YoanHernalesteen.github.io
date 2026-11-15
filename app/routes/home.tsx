import { Link } from "react-router";

import { CaseCard } from "~/components/CaseCard";
import { cases, sortCasesForTrack } from "~/content/cases";
import { FOCUS, positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { t } from "~/i18n";

import type { Route } from "./+types/home";

const positioning = positionings[FOCUS];
const text = t.positioning[FOCUS];

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${site.name} · ${text.role}` },
    { name: "description", content: text.headline },
    { property: "og:title", content: `${site.name} · ${text.role}` },
    { property: "og:description", content: text.headline },
  ];
}

export default function Home() {
  const featured = sortCasesForTrack(cases, positioning.primaryTrack);

  return (
    <>
      <section className="py-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-2 text-xl font-medium text-indigo-700 dark:text-indigo-300">
          {text.role}
        </p>
        <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          {text.headline}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={positioning.cvHref}
            className="rounded-md bg-indigo-700 px-4 py-2 font-medium text-white hover:bg-indigo-800 dark:bg-indigo-300 dark:text-gray-950 dark:hover:bg-indigo-200"
          >
            {text.cvLabel}
          </a>
          <Link
            to="/contact"
            className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            {t.home.contactCta}
          </Link>
        </div>
      </section>

      <section aria-labelledby="skills-title" className="py-6">
        <h2 id="skills-title" className="text-2xl font-semibold">
          {t.home.skillsTitle}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {text.skills.map((skill) => (
            <li
              key={skill}
              className="rounded bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cases-title" className="py-6">
        <h2 id="cases-title" className="text-2xl font-semibold">
          {t.home.casesTitle}
        </h2>
        <div className="mt-4 grid gap-4">
          {featured.map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}
        </div>
        <Link
          to="/cas"
          className="mt-4 inline-block underline underline-offset-4"
        >
          {t.home.allCases}
        </Link>
      </section>

      <section aria-labelledby="career-title" className="py-6">
        <h2 id="career-title" className="text-2xl font-semibold">
          {t.home.careerTitle}
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {site.employers.join(" · ")}
        </p>
      </section>
    </>
  );
}
