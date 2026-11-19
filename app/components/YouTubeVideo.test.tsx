import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { YouTubeVideo } from "./YouTubeVideo";

function renderVideo() {
  return render(
    <YouTubeVideo
      id="fWhkmTl9tCk"
      title="Comparaison des contrôles"
      thumbnail="/miniature.webp"
    />,
  );
}

describe("YouTubeVideo", () => {
  it("ne charge rien depuis YouTube avant le clic", () => {
    const { container } = renderVideo();

    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector("img")).toHaveAttribute(
      "src",
      "/miniature.webp",
    );
  });

  it("propose un bouton qui nomme la vidéo", () => {
    renderVideo();

    expect(
      screen.getByRole("button", {
        name: "Lire la vidéo : Comparaison des contrôles",
      }),
    ).toBeInTheDocument();
  });

  it("charge le lecteur youtube-nocookie au clic", () => {
    renderVideo();

    fireEvent.click(screen.getByRole("button"));

    const player = screen.getByTitle("Comparaison des contrôles");
    expect(player.tagName).toBe("IFRAME");
    expect(player.getAttribute("src")).toMatch(
      /^https:\/\/www\.youtube-nocookie\.com\/embed\/fWhkmTl9tCk\?/,
    );
    expect(screen.queryByRole("button")).toBeNull();
  });
});
