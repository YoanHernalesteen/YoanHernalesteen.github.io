import { redirect } from "react-router";

// Le profil produit est devenu l'accueil. L'adresse reste en ligne pour les
// QR codes et les CV déjà envoyés : au build, React Router en fait une page
// qui redirige vers l'accueil, même sans JavaScript.
export function loader() {
  return redirect("/", 301);
}

// Jamais affiché : le loader redirige avant. Sans composant, React Router
// traiterait la route comme une ressource et ne générerait pas cette page.
export default function Produit() {
  return null;
}
