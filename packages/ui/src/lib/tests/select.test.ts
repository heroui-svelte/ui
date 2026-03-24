import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import SelectHarness from "./fixtures/select-harness.svelte";

describe("select", () => {
  it("renders the Bits-backed trigger/value/popover stack and updates the displayed value", async () => {
    const {container} = render(SelectHarness, {
      props: {
        open: true,
      },
    });

    const root = container.querySelector('[data-slot="select"]');
    const trigger = screen.getByRole("button", {name: /choose a country/i});
    const value = container.querySelector('[data-slot="select-value"]');
    const popover = container.querySelector('[data-slot="select-popover"]');
    const items = screen.getAllByRole("option");
    const canada = screen.getByText("Canada");

    expect(root?.className).toContain("select");
    expect(trigger).toBeTruthy();
    expect(popover).toBeTruthy();
    expect(items).toHaveLength(3);
    expect(value?.textContent?.trim()).toBe("Select a country");

    await fireEvent.pointerDown(canada);
    await fireEvent.pointerUp(canada);

    expect(value?.textContent?.trim()).toBe("Canada");
    expect(container.querySelector('[data-slot="select-indicator"]')).toBeTruthy();
  });
});
