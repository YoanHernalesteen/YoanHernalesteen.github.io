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

import type { Route } from "./+types/root";
// Police hébergée avec le site : aucune requête vers Google (RGPD, performance).
import "@fontsource-variable/inter";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={LANG}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col text-gray-900 dark:text-gray-100">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900"
        >
          {t.skipToContent}
        </a>
        <SiteHeader />
        <main
          id="contenu"
          className="mx-auto w-full max-w-3xl flex-1 px-4 py-8"
        >
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
      <>
        <h1 className="text-3xl font-bold">{t.notFound.title}</h1>
        <p className="mt-4">{t.notFound.text}</p>
        <Link to="/" className="mt-4 inline-block underline underline-offset-4">
          {t.notFound.back}
        </Link>
      </>
    );
  }

  const stack =
    import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <>
      <h1 className="text-3xl font-bold">{t.error.title}</h1>
      <p className="mt-4">{t.error.text}</p>
      {stack && (
        <pre className="mt-4 w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </>
  );
}
