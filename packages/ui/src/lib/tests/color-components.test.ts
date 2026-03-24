import {fireEvent, render, screen} from "@testing-library/svelte";
import {beforeAll, describe, expect, it, vi} from "vitest";

import ColorAreaHarness from "./fixtures/color-area-harness.svelte";
import ColorFieldHarness from "./fixtures/color-field-harness.svelte";
import ColorPickerHarness from "./fixtures/color-picker-harness.svelte";
import ColorSliderHarness from "./fixtures/color-slider-harness.svelte";
import ColorSwatchPickerHarness from "./fixtures/color-swatch-picker-harness.svelte";

describe("color components", () => {
  beforeAll(() => {
    vi.stubGlobal(
      "ResizeObserver",
      class ResizeObserver {
        disconnect() {}
        observe() {}
        unobserve() {}
      },
    );
  });

  it("updates the selected color swatch", async () => {
    render(ColorSwatchPickerHarness);

    await fireEvent.click(screen.getByTestId("swatch-item-#10B981"));

    expect(screen.getByTestId("selected-swatch").textContent).toContain("#10B981");
    expect(screen.getByTestId("swatch-item-#10B981").getAttribute("data-selected")).toBe("true");
  });

  it("updates the color field value from text input", async () => {
    render(ColorFieldHarness);

    const input = screen.getByRole("textbox");

    await fireEvent.input(input, {
      target: {value: "#EF4444"},
    });

    expect(screen.getByTestId("field-value").textContent).toContain("#EF4444");
  });

  it("opens the color picker and selects a swatch", async () => {
    render(ColorPickerHarness);

    await fireEvent.click(screen.getByRole("button", {name: /open color picker/i}));
    expect(screen.getByTestId("picker-area-thumb").getAttribute("style")).toContain("left:");
    await fireEvent.click(screen.getByTestId("picker-item-#10B981"));

    expect(screen.getByTestId("picker-value").textContent).toContain("#10B981");
  });

  it("changes the color slider value with keyboard input", async () => {
    render(ColorSliderHarness);

    const initialValue = screen.getByTestId("slider-value").textContent;

    await fireEvent.keyDown(screen.getByRole("slider"), {
      key: "ArrowRight",
    });

    expect(screen.getByTestId("slider-value").textContent).not.toBe(initialValue);
  });

  it("changes the color area value with keyboard input", async () => {
    render(ColorAreaHarness);

    const initialValue = screen.getByTestId("area-value").textContent;

    expect(screen.getByTestId("area-thumb").getAttribute("style")).toContain("left:");

    await fireEvent.keyDown(screen.getByRole("button", {name: /color area/i}), {
      key: "ArrowRight",
    });

    expect(screen.getByTestId("area-value").textContent).not.toBe(initialValue);
  });
});
