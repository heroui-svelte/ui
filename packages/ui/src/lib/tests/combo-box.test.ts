import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import ComboBoxHarness from "./fixtures/combo-box-harness.svelte";

describe("combo-box", () => {
  it("renders an interactive combobox input with listbox items and updates from selection", async () => {
    const {container} = render(ComboBoxHarness, {
      props: {
        open: true,
      },
    });

    const root = container.querySelector('[data-slot="combo-box"]');
    const input = screen.getByRole("combobox", {name: /search countries/i});
    const trigger = screen.getByRole("button", {name: /toggle countries/i});
    const popover = container.querySelector('[data-slot="combo-box-popover"]');
    const canada = screen.getByText("Canada");

    expect(root?.className).toContain("combo-box");
    expect(input).toBeTruthy();
    expect(trigger).toBeTruthy();
    expect(popover).toBeTruthy();
    expect(container.querySelector('[data-slot="combo-box-trigger-default-icon"]')).toBeTruthy();

    await fireEvent.pointerDown(canada);
    await fireEvent.pointerUp(canada);

    expect((input as HTMLInputElement).value).toContain("Canada");
  });
});
