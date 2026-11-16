import { useRef, useState, type KeyboardEvent } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { FOCUS, focusForPath, positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { t } from "~/i18n";

const MENU_ID = "menu-principal";

const linkClass =
  "inline-flex min-h-11 items-center text-[15px] text-ink underline-offset-[6px] hover:underline";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Sur /dev et /produit, le CV de ce profil ; ailleurs, celui de l'angle actif.
  const pageFocus = focusForPath(pathname);
  const cv = pageFocus
    ? {
        href: positionings[pageFocus].cvHref,
        label: t.header.cvByFocus[pageFocus],
      }
    : { href: positionings[FOCUS].cvHref, label: t.header.cv };

  const close = () => setOpen(false);

  // Échap ferme le menu et rend le focus au bouton qui l'a ouvert.
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && open) {
      close();
      toggleRef.current?.focus();
    }
  };

  return (
    <header className="border-b border-line bg-bg">
      <div className="page flex flex-wrap items-center justify-between gap-x-4 py-3 md:py-5">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center font-display text-lg font-bold"
        >
          {site.name}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={MENU_ID}
          aria-label={open ? t.header.menuClose : t.header.menuOpen}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line-strong bg-surface md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <nav
          id={MENU_ID}
          aria-label={t.nav.label}
          onKeyDown={onKeyDown}
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-1 py-3 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:py-0`}
        >
          <NavLink
            to="/cas"
            onClick={close}
            className={`${linkClass} aria-[current=page]:font-semibold aria-[current=page]:underline`}
          >
            {t.nav.cases}
          </NavLink>
          <Link to="/#parcours" onClick={close} className={linkClass}>
            {t.nav.career}
          </Link>
          <a href="#contact" onClick={close} className={linkClass}>
            {t.nav.contact}
          </a>
          <a
            href={cv.href}
            onClick={close}
            className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-ink px-[18px] font-semibold text-bg hover:opacity-90"
          >
            {cv.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
