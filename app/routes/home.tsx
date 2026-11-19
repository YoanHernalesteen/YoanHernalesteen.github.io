import { Link } from "react-router";

import { CareerKindIcon } from "~/components/CareerKindIcon";
import { CaseCard } from "~/components/CaseCard";
import { ContactSection } from "~/components/ContactSection";
import { SectionHeader, sectionLabel } from "~/components/SectionHeader";
import { TestimonialList } from "~/components/TestimonialList";
import { cases, featuredCases } from "~/content/cases";
import {
  FOCUS,
  FOCUSES,
  positionings,
  profilePaths,
  type Focus,
} from "~/content/positioning";
import { career } from "~/content/profile";
import { site } from "~/content/site";
import { speedrunActivities } from "~/content/speedrun";
import { testimonialsFor } from "~/content/testimonials";
import { LANG, t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/home";

// L'angle actif d'abord, puis les autres.
const doorOrder: Focus[] = [FOCUS, ...FOCUSES.filter((f) => f !== FOCUS)];

// Couleurs de chaque porte, selon sa piste.
const doorStyles = {
  dev: {
    card: "bg-dev-soft border-dev-line",
    accent: "text-dev",
  },
  produit: {
    card: "bg-produit-soft border-produit-line",
    accent: "text-produit",
  },
} as const;

export function meta(): Route.MetaDescriptors {
  const title = `${site.name} · ${t.home.metaTitle}`;
  return pageMeta({ title, description: t.home.lede, path: "/" });
}

export default function Home() {
  const featured = featuredCases(cases, positionings[FOCUS].primaryTrack);

  return (
    <>
      <section className="page pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="eyebrow mb-5">{t.home.eyebrow}</p>
        <h1 className="max-w-[980px] font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] font-bold tracking-[-0.02em]">
          {t.home.title}
        </h1>
        <p className="mt-7 max-w-[720px] text-lg leading-[1.6] text-muted md:text-xl">
          {t.home.lede}
        </p>
      </section>

      <p className="page eyebrow pb-4">{t.home.doorsEyebrow}</p>
      <section
        aria-label={t.home.doorsLabel}
        className="page flex flex-wrap gap-6 pb-20"
      >
        {doorOrder.map((focus, index) => {
          const door = t.doors[focus];
          const style = doorStyles[positionings[focus].primaryTrack];
          return (
            <Link
              key={focus}
              to={profilePaths[focus]}
              className={`flex min-w-0 flex-[1_1_420px] flex-col gap-4 rounded-2xl border p-7 md:p-9 ${style.card}`}
            >
              <span className={`eyebrow ${style.accent}`}>
                {String(index + 1).padStart(2, "0")} · {door.eyebrow}
              </span>
              <span className="font-display text-2xl leading-tight font-bold md:text-[32px]">
                {door.title}
              </span>
              <span className="leading-[1.6] text-body">{door.text}</span>
              <span className="flex flex-wrap gap-2">
                {door.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-lg bg-surface px-2.5 py-1.5 text-[13px] text-body"
                  >
                    {chip}
                  </span>
                ))}
              </span>
              <span className={`mt-2 font-semibold ${style.accent}`}>
                {door.cta}
              </span>
            </Link>
          );
        })}
      </section>

      {/* Le profil en trois piliers, chacun avec sa preuve. */}
      <section
        aria-labelledby="pillars-title"
        className="border-y border-line bg-surface"
      >
        {/* Titre lu par les lecteurs d'écran : évite de sauter du h1 au h3. */}
        <h2 id="pillars-title" className="sr-only">
          {t.home.pillarsLabel}
        </h2>
        <div className="page grid gap-8 py-10 md:grid-cols-3">
          {t.home.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="font-display text-[22px] leading-tight font-bold">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-muted">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="cases-eyebrow cases-title"
        className="page pt-20 pb-8 md:pt-24"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p id="cases-eyebrow" className="eyebrow">
              {t.home.casesEyebrow}
            </p>
            <h2
              id="cases-title"
              className="mt-2 font-display text-3xl leading-tight font-bold md:text-[40px]"
            >
              {t.home.casesTitle}
            </h2>
          </div>
          <Link
            to="/cas"
            className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
          >
            {t.home.allCases}
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section
        aria-label={t.home.testimonialsLabel}
        className="page pt-16 md:pt-20"
      >
        <p className="eyebrow">{t.home.testimonialsLabel}</p>
        <h2 className="mt-2 font-display text-3xl leading-tight font-bold md:text-[40px]">
          {t.home.testimonialsTitle}
        </h2>
        <TestimonialList
          items={testimonialsFor("accueil")}
          alignRows
          className="mt-8 grid gap-6 md:grid-cols-3 md:gap-y-0"
        />
        <a
          href={site.linkedin}
          className="mt-4 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
        >
          {t.home.allTestimonials}
        </a>
      </section>

      <section
        id="parcours"
        aria-labelledby="career-title"
        className="page scroll-mt-4 py-20 md:py-24"
      >
        <p className="eyebrow">{t.nav.career}</p>
        <h2
          id="career-title"
          className="mt-2 font-display text-3xl leading-tight font-bold md:text-[40px]"
        >
          {t.home.careerTitle}
        </h2>
        {/* Plus large que les autres introductions : la phrase tient sur
            une ligne sur ordinateur, et revient à la ligne sur mobile. */}
        <p className="mt-4 max-w-[860px] text-lg leading-[1.6] text-muted">
          {t.home.careerLede}
        </p>
        {/* Grille : une étape seule en fin de ligne garde la largeur
            d'une colonne au lieu de s'étirer. */}
        <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {career.map((step) => (
            <li
              key={step.startYear + step.title[LANG]}
              // Formation : ligne en pointillés ; poste : ligne pleine.
              // L'étiquette écrite reste l'information principale.
              className={`border-t-2 pt-4 ${step.kind === "formation" ? "border-dashed" : "border-solid"} ${step.current ? "border-dev" : "border-ink"}`}
            >
              {/* Étiquette à gauche, logo en haut à droite : le texte reste
                  aligné d'une étape à l'autre, avec ou sans logo. */}
              <div className="flex items-start justify-between gap-3">
                <p
                  className={`flex items-center gap-1.5 font-mono text-[13px] ${step.current ? "text-dev" : "text-subtle"}`}
                >
                  <CareerKindIcon kind={step.kind} />
                  {t.home.careerKinds[step.kind]} · {step.period[LANG]}
                </p>
                {step.logo && (
                  <img
                    src={step.logo}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="size-10 shrink-0 rounded-lg ring-1 ring-line"
                  />
                )}
              </div>
              <p className="mt-2 font-semibold">{step.title[LANG]}</p>
              <p className="mt-1 text-sm leading-normal text-muted">
                {step.details[LANG]}
              </p>
            </li>
          ))}
        </ol>
        <a
          href={site.mobygames}
          className="mt-8 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
        >
          {t.home.careerCredits}
        </a>
      </section>

      <section
        aria-labelledby={sectionLabel("speedrun")}
        className="page pb-20 md:pb-24"
      >
        <SectionHeader
          id="speedrun"
          eyebrow={t.home.speedrunEyebrow}
          title={t.home.speedrunTitle}
        />
        <p className="-mt-3 max-w-[760px] text-lg leading-[1.6] text-muted">
          {t.home.speedrunLede}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {speedrunActivities.map((activity) => (
            <article
              key={activity.name}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-6"
            >
              <h3 className="font-display text-xl font-bold">
                {activity.name}
              </h3>
              <p className="font-mono text-[13px] text-subtle">
                {activity.role[LANG]} · {t.home.since(activity.since)}
              </p>
              <p className="text-[15px] leading-[1.6] text-body">
                {activity.text[LANG]}
              </p>
              {(activity.links || activity.caseSlug) && (
                <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[15px] font-semibold">
                  {activity.caseSlug && (
                    <Link
                      to={`/cas/${activity.caseSlug}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {t.home.speedrunCase}
                    </Link>
                  )}
                  {activity.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <ContactSection
        title={t.home.contactTitle}
        lede={t.home.contactLede}
        cvs={doorOrder}
      />
    </>
  );
}
