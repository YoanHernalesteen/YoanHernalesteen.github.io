import { Link } from "react-router";

import { CaseCard } from "~/components/CaseCard";
import { ContactSection } from "~/components/ContactSection";
import { heroButton, ProfileHero } from "~/components/ProfileHero";
import { SectionHeader, sectionLabel } from "~/components/SectionHeader";
import { TestimonialCard } from "~/components/TestimonialCard";
import { cases, filterCases } from "~/content/cases";
import { positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { testimonialsFor } from "~/content/testimonials";
import { LANG, t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/dev";

const text = t.dev;

export function meta(): Route.MetaDescriptors {
  const title = `${text.metaTitle} · ${site.name}`;
  return pageMeta({ title, description: text.lede, path: "/dev" });
}

export default function Dev() {
  return (
    <>
      <ProfileHero
        track="dev"
        eyebrow={text.eyebrow}
        title={text.title}
        lede={text.lede}
        actions={
          <>
            <a
              href={positionings["dev-produit"].cvHref}
              className={heroButton.primary("dev")}
            >
              {text.cvCta}
            </a>
            <a href={site.github} className={heroButton.secondary("dev")}>
              {text.githubCta}
            </a>
          </>
        }
      />

      <section
        aria-labelledby={sectionLabel("stack", false)}
        className="page pt-20"
      >
        <SectionHeader id="stack" eyebrow={text.stackEyebrow} />
        <div className="flex flex-wrap gap-6">
          {text.stack.map((block) => (
            <div
              key={block.title}
              className="min-w-0 flex-[1_1_300px] rounded-xl border border-line bg-surface p-7"
            >
              <h2 className="font-display text-[22px] font-bold">
                {block.title}
              </h2>
              <p className="mt-3 leading-[1.7] text-body">{block.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby={sectionLabel("strengths", false)}
        className="page pt-20"
      >
        <SectionHeader id="strengths" eyebrow={text.strengthsEyebrow} />
        <div className="flex flex-wrap gap-8">
          {text.strengths.map((strength) => (
            <div
              key={strength.title}
              className="min-w-0 flex-[1_1_300px] border-t-2 border-dev pt-5"
            >
              <h2 className="font-display text-[22px] font-bold">
                {strength.title}
              </h2>
              <p className="mt-2.5 leading-[1.6] text-muted">{strength.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="etudes-de-cas"
        aria-labelledby={sectionLabel("cases")}
        className="page pt-20"
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
          {filterCases(cases, "dev").map((study) => (
            <CaseCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section aria-label={t.home.testimonialsLabel} className="page py-20">
        <div className="flex flex-col gap-6">
          {testimonialsFor("dev").map(({ testimonial, highlight }) => (
            <TestimonialCard
              key={testimonial.role[LANG] + highlight[LANG]}
              testimonial={testimonial}
              highlight={highlight}
              size="large"
            />
          ))}
        </div>
      </section>

      <ContactSection title={text.contactTitle} cvs={["dev-produit"]} />
    </>
  );
}
