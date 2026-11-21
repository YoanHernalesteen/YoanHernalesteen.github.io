import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { loader } from "./produit";

describe("l'ancienne page /produit", () => {
  it("redirige vers l'accueil de façon permanente", () => {
    const response = loader();

    // 301 : redirection immédiate dans la page prérendue (302 attendrait 2 s).
    expect(response.status).toBe(301);
    expect(response.headers.get("Location")).toBe("/");
  });

  it("mène à l'accueil lors d'une navigation dans le site", async () => {
    const Stub = createRoutesStub([
      { path: "/", Component: () => <p>Accueil</p> },
      { path: "/produit", loader },
    ]);
    render(<Stub initialEntries={["/produit"]} />);

    expect(await screen.findByText("Accueil")).toBeInTheDocument();
  });
});
