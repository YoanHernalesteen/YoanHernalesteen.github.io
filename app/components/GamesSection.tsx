import { GameList } from "~/components/GameList";
import { SectionHeader, sectionLabel } from "~/components/SectionHeader";
import { games, gamesNewestFirst } from "~/content/profile";
import { site } from "~/content/site";
import { t } from "~/i18n";

// Tous les jeux livrés. Cible du lien « Voir les 25 jeux » (/cas#jeux).
export function GamesSection() {
  return (
    <section
      id="jeux"
      aria-labelledby={sectionLabel("games")}
      className="scroll-mt-4 pt-20"
    >
      <SectionHeader
        id="games"
        eyebrow={t.games.eyebrow}
        title={t.games.title}
      />
      <p className="-mt-3 mb-7 max-w-[700px] text-[17px] leading-[1.6] text-muted">
        {t.games.lede}
      </p>
      <GameList games={gamesNewestFirst(games)} />
      <a href={site.mobygames} className="mt-3 more-link">
        {t.games.allCredits}
      </a>
    </section>
  );
}
