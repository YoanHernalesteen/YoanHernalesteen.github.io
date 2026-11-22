import {
  formatInstalls,
  formatRating,
  GAMELOFT_ROLES,
  gameloftGames,
  gamesForRole,
} from "~/content/gameloft";
import { t } from "~/i18n";

const text = t.gameloft;

// La note visible « 4,4/5 », lue « 4,4 sur 5 » par les lecteurs d'écran.
function Rating({ store, rating }: { store: string; rating: number }) {
  const value = formatRating(rating);
  return (
    <span>
      {store} <span aria-hidden="true">{value}/5</span>
      <span className="sr-only">{text.ratingLabel(value)}</span>
    </span>
  );
}

// Les jeux suivis chez Gameloft, groupés selon mon rôle. Inséré dans le MDX
// d'une étude de cas : les « ! » passent devant les styles de .case-body.
export function GameloftGames() {
  return (
    <div className="my-8">
      {GAMELOFT_ROLES.map((role) => {
        const id = `gameloft-${role}`;
        return (
          <section key={role} aria-labelledby={id}>
            <h3 id={id}>{text.roles[role]}</h3>
            <ul className="mb-6! grid list-none! gap-3 pl-0! sm:grid-cols-2">
              {gamesForRole(gameloftGames, role).map((game) => (
                <li
                  key={game.title}
                  className="flex items-center gap-4 rounded-xl border border-line bg-surface p-3"
                >
                  <img
                    src={game.icon}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="size-12! shrink-0 rounded-[11px]! border-0!"
                  />
                  <div className="flex min-w-0 flex-col">
                    <h4 className="leading-snug font-semibold text-ink">
                      {game.title}
                    </h4>
                    <span className="flex flex-col text-sm leading-normal text-muted">
                      <span className="flex flex-wrap gap-x-3">
                        {game.playRating !== undefined && (
                          <Rating
                            store={text.googlePlay}
                            rating={game.playRating}
                          />
                        )}
                        {game.appStoreRating !== undefined && (
                          <Rating
                            store={text.appStore}
                            rating={game.appStoreRating}
                          />
                        )}
                      </span>
                      {game.playInstalls !== undefined && (
                        <span>
                          {text.downloads(formatInstalls(game.playInstalls))}
                        </span>
                      )}
                      {game.paid && <span>{text.paid}</span>}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
