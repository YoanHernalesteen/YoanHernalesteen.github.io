import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import Produit, { meta } from "./produit";

function stubFromProduit() {
  return createRoutesStub([
    { path: "/", Component: () => <p>Accueil</p> },
    { path: "/produit", Component: Produit },
  ]);
}

describe("l'ancienne page /produit", () => {
  it("renvoie vers l'accueil, même sans JavaScript", () => {
    expect(meta()).toContainEqual({
      httpEquiv: "refresh",
      content: "0; url=/",
    });
  });

  it("désigne l'accueil comme page de référence, sans signal contradictoire", () => {
    expect(meta()).toContainEqual({
      tagName: "link",
      rel: "canonical",
      href: "https://yoanhernalesteen.com/",
    });
    expect(meta()).not.toContainEqual({ name: "robots", content: "noindex" });
  });

  it("propose un lien vers l'accueil si la redirection ne se fait pas", () => {
    const Stub = stubFromProduit();
    const html = renderToStaticMarkup(<Stub initialEntries={["/produit"]} />);

    expect(html).toMatch(/<a [^>]*href="\/"[^>]*>Aller à l&#x27;accueil<\/a>/);
  });

  it("redirige vers l'accueil lors d'une navigation dans le site", async () => {
    const Stub = stubFromProduit();
    render(<Stub initialEntries={["/produit"]} />);

    expect(await screen.findByText("Accueil")).toBeInTheDocument();
  });
});
