import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import SliderHarness from "./fixtures/slider-harness.svelte";

describe("slider", () => {
  it("renders the bits-backed track/fill/thumb stack and updates through keyboard input", async () => {
    const onValueChange = vi.fn();
    const {container} = render(SliderHarness, {
      props: {
        onValueChange,
      },
    });

    const root = container.querySelector('[data-slot="slider"]');
    const track = container.querySelector('[data-slot="slider-track"]');
    const fill = container.querySelector('[data-slot="slider-fill"]');
    const marks = container.querySelector('[data-slot="slider-marks"]');
    const output = container.querySelector('[data-slot="slider-output"]');
    const thumb = screen.getByRole("slider");

    expect(root?.className).toContain("slider");
    expect(track).toBeTruthy();
    expect(fill).toBeTruthy();
    expect(marks?.childElementCount).toBeGreaterThan(0);
    expect(output?.textContent).toContain("30");
    expect(thumb.getAttribute("aria-valuenow")).toBe("30");
    expect(container.querySelector('[data-slot="slider-thumb"]')?.getAttribute("style")).toContain(
      "top: 0%",
    );
    expect(track?.getAttribute("data-fill-start")).toBe("true");
    expect(track?.hasAttribute("data-fill-end")).toBe(false);
    expect(fill?.getAttribute("style")).toContain("position: absolute");
    expect(fill?.getAttribute("style")).toContain("left: 0%");
    expect(fill?.getAttribute("style")).toContain("right: 70%");

    await fireEvent.keyDown(thumb, {key: "ArrowRight"});

    expect(onValueChange).toHaveBeenLastCalledWith(35);
    expect(thumb.getAttribute("aria-valuenow")).toBe("35");
    expect(output?.textContent).toContain("35");
    expect(fill?.getAttribute("style")).toContain("right: 65%");
  });

  it("positions the fill between thumbs for range sliders", () => {
    const {container} = render(SliderHarness, {
      props: {
        defaultValue: [25, 75],
      },
    });

    const track = container.querySelector('[data-slot="slider-track"]');
    const fill = container.querySelector('[data-slot="slider-fill"]');
    const thumbs = screen.getAllByRole("slider");

    expect(thumbs).toHaveLength(2);
    expect(track?.hasAttribute("data-fill-start")).toBe(false);
    expect(track?.hasAttribute("data-fill-end")).toBe(false);
    expect(fill?.getAttribute("style")).toContain("left: 25%");
    expect(fill?.getAttribute("style")).toContain("right: 25%");
  });
});
