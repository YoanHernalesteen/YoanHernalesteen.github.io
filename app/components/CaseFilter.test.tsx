import { fireEvent, render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { makeCase } from "~/test/makeCase";

import { CaseFilter } from "./CaseFilter";

const list = [
  makeCase({ slug: "cas-dev", title: { fr: "Cas dev" }, tracks: ["dev"] }),
  makeCase({
    slug: "cas-produit",
    title: { fr: "Cas produit" },
    tracks: ["produit"],
  }),
];

function renderFilter() {
  // CaseFilter affiche des liens : il a besoin d'un routeur.
  const Stub = createRoutesStub([
    { path: "/", Component: () => <CaseFilter cases={list} /> },
  ]);
  render(<Stub />);
}

describe("CaseFilter", () => {
  it("affiche tous les cas par défaut", () => {
    renderFilter();

    expect(screen.getByRole("button", { name: "Tous" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("link", { name: "Cas dev" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cas produit" }),
    ).toBeInTheDocument();
  });

  it("ne garde que les cas de la piste choisie", () => {
    renderFilter();

    fireEvent.click(screen.getByRole("button", { name: "Produit" }));

    expect(screen.getByRole("button", { name: "Produit" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.queryByRole("link", { name: "Cas dev" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Cas produit" }),
    ).toBeInTheDocument();
  });
});
