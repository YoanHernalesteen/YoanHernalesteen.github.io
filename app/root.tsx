import { config } from "@fortawesome/fontawesome-svg-core";
import {
  isRouteErrorResponse,
  Link,
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";
import { LANG, t } from "~/i18n";
import { themeInitScript } from "~/theme";

import type { Route } from "./+types/root";
// Polices hébergées avec le site : aucune requête vers Google (RGPD, performance).
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/space-grotesk";
// Le CSS des icônes est inclus dans le build, et non injecté par JavaScript :
// sans lui, les pages prérendues afficheraient des icônes géantes au chargement.
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./app.css";

config.autoAddCss = false;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning : le script ci-dessous peut ajouter data-theme
    // sur <html> avant que React ne reprenne la main ; c'est voulu.
    <html lang={LANG} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Applique le thème enregistré avant l'affichage (pas de flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-[10px] focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          {t.skipToContent}
        </a>
        <SiteHeader />
        {/* Pleine largeur : chaque page gère ses bandeaux et ses conteneurs. */}
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="page py-16">
        <h1 className="font-display text-4xl font-bold">{t.notFound.title}</h1>
        <p className="mt-4 text-lg text-muted">{t.notFound.text}</p>
        <Link
          to="/"
          className="mt-4 inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
        >
          {t.notFound.back}
        </Link>
      </div>
    );
  }

  const stack =
    import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <div className="page py-16">
      <h1 className="font-display text-4xl font-bold">{t.error.title}</h1>
      <p className="mt-4 text-lg text-muted">{t.error.text}</p>
      {stack && (
        <pre className="mt-4 w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
