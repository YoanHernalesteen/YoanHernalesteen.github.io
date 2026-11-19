import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import type { CareerKind } from "~/content/profile";

const icons: Record<CareerKind, IconDefinition> = {
  formation: faGraduationCap,
  poste: faBriefcase,
};

// Icône décorative : l'étiquette écrite (« Formation », « Poste ») porte
// l'information, l'icône est donc masquée aux lecteurs d'écran.
export function CareerKindIcon({ kind }: { kind: CareerKind }) {
  return (
    <FontAwesomeIcon
      icon={icons[kind]}
      aria-hidden="true"
      className="shrink-0 text-[14px]"
    />
  );
}
