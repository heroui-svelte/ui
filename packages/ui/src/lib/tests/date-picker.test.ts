import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import DatePickerHarness from "./fixtures/date-picker-harness.svelte";

describe("date-picker", () => {
  it("renders visible segments and updates selection from the calendar", async () => {
    const {container} = render(DatePickerHarness, {
      props: {
        open: true,
      },
    });

    const root = container.querySelector('[data-slot="date-picker"]');
    const trigger = screen.getByRole("button", {name: /choose a date/i});
    const indicator = container.querySelector('[data-slot="date-picker-trigger-indicator"] svg');
    const segments = container.querySelectorAll('[data-slot="date-input-group-segment"]');
    const initialSegmentText = Array.from(segments)
      .map((segment) => segment.textContent?.trim() ?? "")
      .join("");
    const popover = container.querySelector('[data-slot="date-picker-popover"]');
    const grid = popover?.querySelector(".calendar__grid");
    const cells = popover?.querySelectorAll(".calendar__cell");
    const selectableDay = popover?.querySelector<HTMLElement>(
      ".calendar__cell:not([data-outside-month]):not([data-disabled]) [data-bits-day]",
    );

    expect(root?.className).toContain("date-picker");
    expect(root?.getAttribute("data-open")).toBe("true");
    expect(root?.getAttribute("data-required")).toBe("true");
    expect(trigger).toBeTruthy();
    expect(indicator).toBeTruthy();
    expect(segments.length).toBeGreaterThan(0);
    expect(initialSegmentText.length).toBeGreaterThan(0);
    expect(grid).toBeTruthy();
    expect(cells?.length ?? 0).toBeGreaterThan(0);
    expect(selectableDay).toBeTruthy();

    await fireEvent.click(selectableDay!);

    const selectedCell = popover?.querySelector(".calendar__cell[data-selected]");
    const updatedSegmentText = Array.from(
      container.querySelectorAll('[data-slot="date-input-group-segment"]'),
    )
      .map((segment) => segment.textContent?.trim() ?? "")
      .join("");

    expect(selectedCell).toBeTruthy();
    expect(updatedSegmentText.length).toBeGreaterThan(0);
  });
});
