import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import CheckboxHarness from "./fixtures/checkbox-harness.svelte";

describe("checkbox", () => {
  it("toggles standalone state and propagates group variants", async () => {
    const onStandaloneChange = vi.fn();
    const onGroupChange = vi.fn();

    render(CheckboxHarness, {
      props: {
        onGroupChange,
        onStandaloneChange,
      },
    });

    const standaloneCheckbox = screen.getByRole("checkbox", {name: /standalone/i});
    const mixedCheckbox = screen.getByRole("checkbox", {name: /partially selected/i});
    const codingCheckbox = screen.getByRole("checkbox", {name: /coding/i});
    const designCheckbox = screen.getByRole("checkbox", {name: /design/i});

    expect(standaloneCheckbox.getAttribute("data-selected")).toBeNull();
    expect(mixedCheckbox.getAttribute("aria-checked")).toBe("mixed");
    expect(mixedCheckbox.getAttribute("data-indeterminate")).toBe("true");
    expect(
      mixedCheckbox.querySelector('[data-slot="checkbox-default-indicator--indeterminate"]'),
    ).toBeTruthy();

    expect(codingCheckbox.className).toContain("checkbox--secondary");
    expect(designCheckbox.className).toContain("checkbox--secondary");
    expect(designCheckbox.getAttribute("data-selected")).toBe("true");

    await fireEvent.click(standaloneCheckbox);

    expect(onStandaloneChange).toHaveBeenLastCalledWith(true);
    expect(standaloneCheckbox.getAttribute("data-selected")).toBe("true");

    await fireEvent.click(codingCheckbox);

    expect(onGroupChange).toHaveBeenCalled();
    expect(onGroupChange.mock.lastCall?.[0]).toEqual(expect.arrayContaining(["coding", "design"]));
    expect(codingCheckbox.getAttribute("data-selected")).toBe("true");
  });
});
