import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { FOCUS, focusForPath, positionings } from "~/content/positioning";
import { site } from "~/content/site";
import { t } from "~/i18n";

import { ThemeToggle } from "./ThemeToggle";

const MENU_ID = "menu-principal";

const linkClass =
  "inline-flex min-h-11 items-center text-[15px] text-ink underline-offset-[6px] hover:underline";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Sur /dev et /produit, le CV de ce profil ; ailleurs, celui de l'angle actif.
  const pageFocus = focusForPath(pathname);
  const cvHref = positionings[pageFocus ?? FOCUS].cvHref;

  // L'accueil et les pages de profil ont un bloc contact ; ailleurs,
  // le lien mène à celui de l'accueil.
  const contactHref = pathname === "/" || pageFocus ? "#contact" : "/#contact";

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

        {/* Mobile : à droite du nom. Bureau : après la navigation (order-last). */}
        <div className="flex items-center gap-2 md:order-last">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? t.header.menuClose : t.header.menuOpen}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line-strong bg-surface md:hidden"
          >
            <FontAwesomeIcon
              icon={open ? faXmark : faBars}
              aria-hidden="true"
              className="text-lg"
            />
          </button>
        </div>

        <nav
          id={MENU_ID}
          aria-label={t.nav.label}
          onKeyDown={onKeyDown}
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-1 py-3 md:ml-auto md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:py-0`}
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
          <a href={contactHref} onClick={close} className={linkClass}>
            {t.nav.contact}
          </a>
          <a
            href={cvHref}
            onClick={close}
            className="inline-flex min-h-11 items-center justify-center rounded-[10px] bg-ink px-[18px] font-semibold text-bg hover:opacity-90"
          >
            {t.header.cv}
          </a>
        </nav>
      </div>
    </header>
  );
}
