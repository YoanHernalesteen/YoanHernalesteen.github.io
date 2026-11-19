import { site } from "~/content/site";
import { t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/legal";

export function meta(): Route.MetaDescriptors {
  return pageMeta({
    title: `${t.footer.legal} · ${site.name}`,
    description: `Mentions légales du site de ${site.name}.`,
    path: "/mentions-legales",
    noindex: true,
  });
}

export default function Legal() {
  return (
    <article className="case-body page max-w-[760px] py-16">
      <h1 className="font-display text-4xl font-bold">{t.footer.legal}</h1>
      <h2>Éditeur</h2>
      <p>
        {site.name}, particulier.
        <br />
        Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Hébergeur</h2>
      <p>
        GitHub, Inc. (GitHub Pages), 88 Colin P. Kelly Jr. Street, San
        Francisco, CA 94107, États-Unis.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Ce site ne dépose aucun cookie et ne collecte aucune donnée personnelle.
      </p>
      <p>
        Les vidéos YouTube ne se chargent que si vous cliquez dessus. YouTube
        peut alors déposer des cookies, selon sa propre politique de
        confidentialité.
      </p>
    </article>
  );
}
