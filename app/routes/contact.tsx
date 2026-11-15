import { site } from "~/content/site";
import { t } from "~/i18n";

import type { Route } from "./+types/contact";

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${t.nav.contact} · ${site.name}` },
    { name: "description", content: `Contacter ${site.name}.` },
  ];
}

export default function Contact() {
  return (
    <article className="case-body">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.nav.contact}
      </h1>
      <ul>
        <li>
          E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          LinkedIn : <a href={site.linkedin}>{site.linkedin}</a>
        </li>
        <li>
          GitHub : <a href={site.github}>{site.github}</a>
        </li>
      </ul>
    </article>
  );
}
