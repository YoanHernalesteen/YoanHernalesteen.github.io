import { Link } from "react-router";

import { CaseCard } from "~/components/CaseCard";
import { ContactSection } from "~/components/ContactSection";
import { GamesSection } from "~/components/GamesSection";
import { MethodSection } from "~/components/MethodSection";
import { heroButton, ProfileHero } from "~/components/ProfileHero";
import { SectionHeader, sectionLabel } from "~/components/SectionHeader";
import { TestimonialList } from "~/components/TestimonialList";
import { cases, filterCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { testimonialsFor } from "~/content/testimonials";
import { t } from "~/i18n";
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

      <div className="page">
        <GamesSection />
      </div>

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
