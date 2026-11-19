import type { ReactNode } from "react";

import type { CareerKind } from "~/content/profile";

// Tracés des icônes (style « trait », comme les autres icônes du site).
const paths: Record<CareerKind, ReactNode> = {
  formation: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
    </>
  ),
  poste: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
};

// Icône décorative : l'étiquette écrite (« Formation », « Poste ») porte
// l'information, l'icône est donc masquée aux lecteurs d'écran.
export function CareerKindIcon({ kind }: { kind: CareerKind }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {paths[kind]}
    </svg>
  );
}
