import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { t } from "~/i18n";

interface Props {
  // Identifiant YouTube de la vidéo (la partie après « v= » dans l'URL).
  id: string;
  title: string;
  // Miniature hébergée avec le site, importée depuis app/assets/.
  thumbnail: string;
}

// Le lecteur YouTube n'est chargé qu'au clic : avant, aucune requête ne part
// vers Google, donc aucun cookie (voir les mentions légales).
export function YouTubeVideo({ id, title, thumbnail }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="aspect-video w-full rounded-xl border border-line"
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={t.video.play(title)}
      onClick={() => setPlaying(true)}
      className="group relative block w-full"
    >
      <img
        src={thumbnail}
        alt=""
        loading="lazy"
        decoding="async"
        className="aspect-video w-full rounded-xl border border-line object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-night/80 text-night-ink transition-transform group-hover:scale-110 motion-reduce:transition-none">
          <FontAwesomeIcon
            icon={faPlay}
            aria-hidden="true"
            className="text-2xl"
          />
        </span>
      </span>
    </button>
  );
}
