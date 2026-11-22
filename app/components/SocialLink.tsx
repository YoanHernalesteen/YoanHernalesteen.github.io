import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faGithub,
  faLinkedin,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

const ICONS: Record<string, IconDefinition> = {
  "github.com": faGithub,
  "linkedin.com": faLinkedin,
  "twitch.tv": faTwitch,
  "youtube.com": faYoutube,
};

// L'icône du réseau d'après le domaine de l'adresse (www. compris), ou
// undefined pour un autre site.
export function socialIconFor(href: string): IconDefinition | undefined {
  const host = new URL(href).hostname.replace(/^www\./, "");
  return ICONS[host];
}

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}

// Lien vers un réseau social : le logo précède le nom, qui reste le texte
// du lien (l'icône est décorative).
export function SocialLink({ href, children, className }: Props) {
  const icon = socialIconFor(href);
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1.5 ${className ?? ""}`}
    >
      {icon && <FontAwesomeIcon icon={icon} aria-hidden="true" />}
      {children}
    </a>
  );
}
