import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";

import { cases } from "~/content/cases";

import Cases from "./cases";

function renderCases() {
  const Stub = createRoutesStub([{ path: "/cas", Component: Cases }]);
  render(<Stub initialEntries={["/cas"]} />);
}

describe("la page /cas", () => {
  it("a son titre principal", () => {
    renderCases();

    expect(
      screen.getByRole("heading", { level: 1, name: "Du game design au code" }),
    ).toBeInTheDocument();
  });

  it("liste toutes les études de cas", () => {
    renderCases();

    for (const study of cases) {
      expect(
        screen.getByRole("link", { name: study.title.fr }),
      ).toBeInTheDocument();
    }
  });
});
