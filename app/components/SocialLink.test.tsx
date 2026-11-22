import {
  faGithub,
  faLinkedin,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLink, socialIconFor } from "./SocialLink";

describe("socialIconFor", () => {
  it("reconnaît le réseau d'après l'adresse", () => {
    expect(socialIconFor("https://www.youtube.com/@JPP_Speedrun")).toBe(
      faYoutube,
    );
    expect(socialIconFor("https://www.twitch.tv/jpp_speedrun")).toBe(faTwitch);
    expect(socialIconFor("https://www.linkedin.com/in/x")).toBe(faLinkedin);
    expect(socialIconFor("https://github.com/x")).toBe(faGithub);
  });

  it("ne se laisse pas tromper par un domaine qui contient le nom", () => {
    expect(socialIconFor("https://youtube.com.example.org/x")).toBeUndefined();
    expect(socialIconFor("https://example.org/?q=github.com")).toBeUndefined();
  });
});

describe("SocialLink", () => {
  it("garde le nom du lien lisible et l'icône décorative", () => {
    render(
      <SocialLink href="https://www.twitch.tv/jpp_speedrun">Twitch</SocialLink>,
    );

    const link = screen.getByRole("link", { name: "Twitch" });
    expect(link).toHaveAttribute("href", "https://www.twitch.tv/jpp_speedrun");
    expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("n'affiche pas d'icône pour un site inconnu", () => {
    render(<SocialLink href="https://example.org">Exemple</SocialLink>);

    expect(
      screen.getByRole("link", { name: "Exemple" }).querySelector("svg"),
    ).toBeNull();
  });
});
