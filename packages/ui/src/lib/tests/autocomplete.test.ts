import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import AutocompleteHarness from "./fixtures/autocomplete-harness.svelte";

describe("autocomplete", () => {
  it("renders the trigger/value/popover stack and clears the current selection", async () => {
    const {container} = render(AutocompleteHarness);

    const root = container.querySelector('[data-slot="autocomplete"]');
    const trigger = screen.getByRole("button", {name: /choose a country/i});
    const value = container.querySelector('[data-slot="autocomplete-value"]');
    const clearButton = container.querySelector('[data-slot="autocomplete-clear-button"]');
    const canada = screen.getByText("Canada");

    expect(root?.className).toContain("autocomplete");
    expect(trigger).toBeTruthy();
    expect(value?.textContent?.trim()).toBe("Select a country");
    expect(clearButton?.getAttribute("data-empty")).toBe("true");

    await fireEvent.pointerDown(canada);
    await fireEvent.pointerUp(canada);

    expect(value?.textContent?.trim()).toBe("Canada");
    expect(clearButton?.getAttribute("data-empty")).toBeNull();

    await fireEvent.pointerDown(clearButton!);
    await fireEvent.click(clearButton!);

    expect(value?.textContent?.trim()).toBe("Select a country");
    expect(clearButton?.getAttribute("data-empty")).toBe("true");
  });
});
