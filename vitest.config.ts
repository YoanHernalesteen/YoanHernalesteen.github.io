import mdx from "@mdx-js/rollup";
import { defineConfig } from "vitest/config";

// Config séparée de vite.config.ts : le plugin React Router ne sert pas
// pour les tests de composants. MDX, lui, sert pour tester les études de cas.
export default defineConfig({
  plugins: [{ enforce: "pre", ...mdx() }],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
  },
});
