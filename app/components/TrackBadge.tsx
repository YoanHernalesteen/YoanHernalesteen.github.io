import type { Track } from "~/content/cases";
import { t } from "~/i18n";

const styles: Record<Track, string> = {
  dev: "bg-dev-soft text-dev",
  produit: "bg-produit-soft text-produit",
};

// Pastille « Dev » ou « Produit ».
export function TrackBadge({ track }: { track: Track }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-mono text-xs font-medium ${styles[track]}`}
    >
      {t.tracks[track]}
    </span>
  );
}
