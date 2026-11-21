import { SectionHeader, sectionLabel } from "~/components/SectionHeader";
import { t } from "~/i18n";

const text = t.produit;

// Les 4 étapes de ma méthode produit, chacune avec un exemple.
export function MethodSection() {
  return (
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
  );
}
