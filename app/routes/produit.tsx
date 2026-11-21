import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

import { site } from "~/content/site";
import { t } from "~/i18n";
import { pageMeta } from "~/seo";

import type { Route } from "./+types/produit";

// Le profil produit est devenu l'accueil. L'adresse reste en ligne pour les
// QR codes et les CV déjà envoyés : elle renvoie vers l'accueil.
export function meta(): Route.MetaDescriptors {
  return [
    // Sans JavaScript (et pour les moteurs) : redirection immédiate.
    { httpEquiv: "refresh", content: "0; url=/" },
    ...pageMeta({
      title: site.name,
      description: t.home.metaDescription,
      path: "/",
    }),
  ];
}

export default function Produit() {
  const navigate = useNavigate();

  // Navigation dans le site : la balise refresh n'est lue qu'au chargement.
  useEffect(() => {
    void navigate("/", { replace: true });
  }, [navigate]);

  return (
    <p className="page py-20">
      <Link to="/" className="more-link">
        {t.produit.redirect}
      </Link>
    </p>
  );
}
