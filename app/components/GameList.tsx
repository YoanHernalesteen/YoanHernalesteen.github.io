import type { Game } from "~/content/profile";
import { LANG } from "~/i18n";

interface Props {
  games: readonly Game[];
}

// Grille de cartes : visuel officiel avec son copyright, titre, rôle.
export function GameList({ games }: Props) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <li
          key={game.title}
          className="flex flex-col rounded-xl border border-line bg-surface p-5"
        >
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
  );
}
