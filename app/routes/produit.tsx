import { Link } from "react-router";

import { CaseCard } from "~/components/CaseCard";
import { ContactSection } from "~/components/ContactSection";
import { heroButton, ProfileHero } from "~/components/ProfileHero";
import { SectionHeader, sectionLabel } from "~/components/SectionHeader";
import { TestimonialList } from "~/components/TestimonialList";
import { cases, filterCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { games, gamesNewestFirst } from "~/content/profile";
import { site } from "~/content/site";
import { testimonialsFor } from "~/content/testimonials";
import { LANG, t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/produit";

const text = t.produit;

export function meta(): Route.MetaDescriptors {
  const title = `${text.metaTitle} · ${site.name}`;
  return pageMeta({ title, description: text.lede, path: "/produit" });
}

export default function Produit() {
  return (
    <>
      <ProfileHero
        track="produit"
        eyebrow={text.eyebrow}
        title={text.title}
        lede={text.lede}
        actions={
          <>
            <a
              href={positionings.po.cvHref}
              className={heroButton.primary("produit")}
            >
              {text.cvCta}
            </a>
            <a
              href="#etudes-de-cas"
              className={heroButton.secondary("produit")}
            >
              {text.casesCta}
            </a>
          </>
        }
      />

      <section aria-labelledby={sectionLabel("method")} className="page pt-20">
        <SectionHeader
          id="method"
          eyebrow={text.methodEyebrow}
          title={text.methodTitle}
        />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {text.method.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border border-line bg-surface p-6"
            >
              <p className="font-mono text-[13px] text-produit">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-[22px] font-bold">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-[1.6] text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="etudes-de-cas"
        aria-labelledby={sectionLabel("cases")}
        className="page scroll-mt-4 pt-20"
      >
        <SectionHeader
          id="cases"
          eyebrow={text.casesEyebrow}
          title={text.casesTitle}
          action={
            <Link
              to="/cas"
              className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
            >
              {t.home.allCases}
            </Link>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {filterCases(cases, "produit").map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section aria-labelledby={sectionLabel("games")} className="page pt-20">
        <SectionHeader
          id="games"
          eyebrow={text.gamesEyebrow}
          title={text.gamesTitle}
        />
        <p className="-mt-3 max-w-[700px] text-[17px] leading-[1.6] text-muted">
          {text.gamesLede}
        </p>
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gamesNewestFirst(games).map((game) => (
            <li
              key={game.title}
              className="flex flex-col rounded-xl border border-line bg-surface p-5"
            >
              {/* Visuel officiel s'il existe, avec son copyright. */}
              {game.image && (
                <figure className="mb-3.5">
                  <img
                    src={game.image.src}
                    alt={game.image.alt[LANG]}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full rounded-lg object-cover"
                  />
                  <figcaption className="mt-1 text-right font-mono text-[11px] text-subtle">
                    {game.image.credit}
                  </figcaption>
                </figure>
              )}
              <h3 className="text-[17px] font-semibold">{game.title}</h3>
              <p className="mt-1 font-mono text-xs text-subtle">
                {game.meta[LANG]}
              </p>
              <p className="mt-2 text-sm leading-normal text-muted">
                {game.role[LANG]}
              </p>
            </li>
          ))}
        </ul>
        <a
          href={site.mobygames}
          className="mt-3 inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline"
        >
          {text.allCredits}
        </a>
      </section>

      <section aria-label={t.home.testimonialsLabel} className="page py-20">
        <TestimonialList
          items={testimonialsFor("produit")}
          size="large"
          className="grid gap-6"
        />
      </section>

      <ContactSection title={text.contactTitle} cvs={["po"]} />
    </>
  );
}
