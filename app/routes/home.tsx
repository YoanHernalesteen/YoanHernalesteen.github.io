import { Link } from "react-router";

import { CareerKindIcon } from "~/components/CareerKindIcon";
import { CaseCard } from "~/components/CaseCard";
import { ContactSection } from "~/components/ContactSection";
import { GameList } from "~/components/GameList";
import { MethodSection } from "~/components/MethodSection";
import { heroButton, ProfileHero } from "~/components/ProfileHero";
import { SectionHeader, sectionLabel } from "~/components/SectionHeader";
import { TestimonialList } from "~/components/TestimonialList";
import { cases, featuredCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { career, games } from "~/content/profile";
import { site } from "~/content/site";
import { speedrunActivities } from "~/content/speedrun";
import { testimonialsFor } from "~/content/testimonials";
import { LANG, t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/home";

export function meta(): Route.MetaDescriptors {
  const title = `${site.name} · ${t.home.metaTitle}`;
  return pageMeta({ title, description: t.home.metaDescription, path: "/" });
}

export default function Home() {
  const featured = featuredCases(cases, "produit");

  return (
    <>
      <ProfileHero
        track="produit"
        eyebrow={t.home.eyebrow}
        title={t.produit.title}
        lede={t.produit.lede}
        actions={
          <>
            <a
              href={positionings.pm.cvHref}
              className={heroButton.primary("produit")}
            >
              {t.produit.cvCta}
            </a>
            <a
              href="#etudes-de-cas"
              className={heroButton.secondary("produit")}
            >
              {t.produit.casesCta}
            </a>
          </>
        }
        footnote={
          <Link to="/dev" className="more-link">
            {t.home.devLink}
          </Link>
        }
      />

      <MethodSection />

      <section
        id="etudes-de-cas"
        aria-labelledby={sectionLabel("cases")}
        className="page scroll-mt-4 pt-20 pb-8"
      >
        <SectionHeader
          id="cases"
          eyebrow={t.home.casesEyebrow}
          title={t.home.casesTitle}
          action={
            <Link to="/cas" className="more-link">
              {t.home.allCases}
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section
        aria-labelledby={sectionLabel("testimonials")}
        className="page pt-16 md:pt-20"
      >
        <SectionHeader
          id="testimonials"
          eyebrow={t.home.testimonialsLabel}
          title={t.home.testimonialsTitle}
        />
        <TestimonialList
          items={testimonialsFor("accueil")}
          alignRows
          className="grid gap-6 md:grid-cols-3 md:gap-y-0"
        />
        <a href={site.linkedin} className="mt-4 more-link">
          {t.home.allTestimonials}
        </a>
      </section>

      <section
        id="parcours"
        aria-labelledby={sectionLabel("career")}
        className="page scroll-mt-4 py-20 md:py-24"
      >
        <SectionHeader
          id="career"
          eyebrow={t.nav.career}
          title={t.home.careerTitle}
        />
        {/* Plus large que les autres introductions : la phrase tient sur
            une ligne sur ordinateur, et revient à la ligne sur mobile. */}
        <p className="-mt-3 max-w-[860px] text-lg leading-[1.6] text-muted">
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
        <a href={site.mobygames} className="mt-8 more-link">
          {t.home.careerCredits}
        </a>
      </section>

      <section
        aria-labelledby={sectionLabel("games")}
        className="page pb-20 md:pb-24"
      >
        <SectionHeader
          id="games"
          eyebrow={t.games.eyebrow}
          title={t.games.highlightTitle}
          action={
            <Link to="/cas#jeux" className="more-link">
              {t.games.allGames}
            </Link>
          }
        />
        <GameList games={games.filter((game) => game.highlighted)} />
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
              {/* Même disposition que le parcours : titre à gauche, logo
                  décoratif en haut à droite. */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold">
                  {activity.name}
                </h3>
                {activity.logo && (
                  <img
                    src={activity.logo}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="size-10 shrink-0 rounded-lg ring-1 ring-line"
                  />
                )}
              </div>
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
        cvs={["pm"]}
      />
    </>
  );
}
