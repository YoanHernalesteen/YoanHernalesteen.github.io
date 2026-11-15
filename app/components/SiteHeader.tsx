import { Link, NavLink } from "react-router";

import { site } from "~/content/site";
import { t } from "~/i18n";

const LINKS = [
  { to: "/cas", label: t.nav.cases },
  { to: "/a-propos", label: t.nav.about },
  { to: "/contact", label: t.nav.contact },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="font-semibold">
          {site.name}
        </Link>
        <nav aria-label={t.nav.label}>
          <ul className="flex gap-4 text-sm">
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="underline-offset-4 hover:underline aria-[current=page]:font-semibold aria-[current=page]:underline"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
