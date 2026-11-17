import { describe, expect, it } from "vitest";

import { getCase } from "./cases";
import { speedrunActivities } from "./speedrun";

describe("les activités speedrun", () => {
  it("ont un nom, un rôle, une année de début et une description", () => {
    expect(speedrunActivities.length).toBeGreaterThan(0);
    for (const activity of speedrunActivities) {
      expect(activity.name.trim()).not.toBe("");
      expect(activity.role.fr.trim()).not.toBe("");
      expect(activity.since).toBeGreaterThanOrEqual(2000);
      expect(activity.text.fr.trim()).not.toBe("");
    }
  });

  it("n'ont que des liens https", () => {
    for (const activity of speedrunActivities) {
      for (const link of activity.links ?? []) {
        expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });

  it("renvoient vers des études de cas qui existent", () => {
    for (const activity of speedrunActivities) {
      if (activity.caseSlug) {
        expect(getCase(activity.caseSlug), activity.name).toBeDefined();
      }
    }
  });
});
