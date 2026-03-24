import {fireEvent, render} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import AvatarHarness from "./fixtures/avatar-harness.svelte";

describe("avatar", () => {
  it("preserves the class contract and reveals the image once it loads", async () => {
    const {container} = render(AvatarHarness);

    const avatar = container.querySelector('[data-slot="avatar"]');
    const image = container.querySelector('[data-slot="avatar-image"]') as HTMLImageElement | null;
    const fallback = container.querySelector(
      '[data-slot="avatar-fallback"]',
    ) as HTMLSpanElement | null;

    expect(avatar?.className).toContain("avatar--lg");
    expect(avatar?.className).toContain("avatar--soft");
    expect(fallback?.className).toContain("avatar__fallback--accent");
    expect(image?.hidden).toBe(true);
    expect(fallback?.hidden).toBe(true);

    if (!image) {
      throw new Error("Expected avatar image element");
    }

    await fireEvent.load(image);

    expect(image.hidden).toBe(false);
  });
});
