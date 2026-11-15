// Ajoute les assertions DOM (toBeInTheDocument, toHaveAttribute…) à expect.
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Démonte les composants rendus entre chaque test.
afterEach(() => {
  cleanup();
});
