import { Link } from "react-router";

import { CaseCard } from "~/components/CaseCard";
import { ContactSection } from "~/components/ContactSection";
import { MethodSection } from "~/components/MethodSection";
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
              href={positionings.pm.cvHref}
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

      <MethodSection />

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
            <Link to="/cas" className="more-link">
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
        <a href={site.mobygames} className="mt-3 more-link">
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

      <ContactSection title={text.contactTitle} cvs={["pm"]} />
    </>
  );
}
