import { site } from "~/content/site";
import { t } from "~/i18n";

import type { Route } from "./+types/about";

export function meta(): Route.MetaDescriptors {
  return [
    { title: `${t.nav.about} · ${site.name}` },
    // TODO : description définitive
    {
      name: "description",
      content: "Du game design au développement produit : mon parcours.",
    },
  ];
}

// TODO : texte définitif. Le fil rouge : concevoir pour des utilisateurs,
// piloter des features, travailler en Scrum.
export default function About() {
  return (
    <article className="case-body">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {t.nav.about}
      </h1>
      <h2>Mon parcours</h2>
      <ul>
        <li>TODO : études en informatique de gestion en Belgique.</li>
        <li>
          TODO : game design chez Ubisoft, Gameloft, Don't Nod et Ninja Theory.
        </li>
        <li>TODO : reconversion via Le Wagon.</li>
        <li>TODO : Ellii.</li>
      </ul>
      <h2>Le fil rouge</h2>
      <p>TODO</p>
      <h2>Langues</h2>
      <p>Français, anglais.</p>
    </article>
  );
}
