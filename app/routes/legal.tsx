import { site } from "~/content/site";
import { t } from "~/i18n";

import type { Route } from "./+types/legal";

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${t.footer.legal} · ${site.name}` },
    { name: "robots", content: "noindex" },
  ];
}

// TODO : relire avant la mise en ligne (adresse e-mail, mesure d'audience).
export default function Legal() {
  return (
    <article className="case-body">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.footer.legal}
      </h1>
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
    </article>
  );
}
