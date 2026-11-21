import type { ReactNode } from "react";

import type { Track } from "~/content/cases";

const trackStyles: Record<Track, { band: string; accent: string }> = {
  dev: { band: "bg-dev-soft border-dev-line", accent: "text-dev" },
  produit: {
    band: "bg-produit-soft border-produit-line",
    accent: "text-produit",
  },
};

interface Props {
  track: Track;
  eyebrow: string;
  title: string;
  lede: string;
  actions: ReactNode;
  // Lien secondaire, en plus petit sous les boutons.
  footnote?: ReactNode;
}

// Bandeau coloré en haut de l'accueil, de /dev et de /produit.
export function ProfileHero({
  track,
  eyebrow,
  title,
  lede,
  actions,
  footnote,
}: Props) {
  const style = trackStyles[track];

  return (
    <section className={`border-b ${style.band}`}>
      <div className="page pt-16 pb-14 md:pt-22 md:pb-18">
        <p className={`eyebrow mb-5 ${style.accent}`}>{eyebrow}</p>
        <h1 className="max-w-[960px] font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] font-bold tracking-[-0.02em]">
          {title}
        </h1>
        <p className="mt-6 max-w-[740px] text-lg leading-[1.6] text-body md:text-xl">
          {lede}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        {footnote && <p className="mt-4 text-sm">{footnote}</p>}
      </div>
    </section>
  );
}

export const heroButton = {
  primary: (track: Track) =>
    `inline-flex min-h-12 items-center rounded-[10px] px-5 font-semibold text-on-accent hover:opacity-90 ${track === "dev" ? "bg-dev" : "bg-produit"}`,
  secondary: (track: Track) =>
    `inline-flex min-h-12 items-center rounded-[10px] border bg-surface px-5 font-semibold text-ink ${track === "dev" ? "border-dev-line" : "border-produit-line"}`,
};
