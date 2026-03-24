import {render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import DateRangePickerHarness from "./fixtures/date-range-picker-harness.svelte";

describe("date-range-picker", () => {
  it("renders the default segmented trigger and populated range calendar popover", () => {
    const {container} = render(DateRangePickerHarness, {
      props: {
        open: true,
      },
    });

    const root = container.querySelector('[data-slot="date-range-picker"]');
    const trigger = screen.getByRole("button", {name: /choose a date range/i});
    const indicator = container.querySelector(
      '[data-slot="date-range-picker-trigger-indicator"] svg',
    );
    const separator = container.querySelector('[data-slot="date-range-picker-range-separator"]');
    const inputs = container.querySelectorAll('[data-slot="date-input-group-input"]');
    const segments = container.querySelectorAll('[data-slot="date-input-group-segment"]');
    const segmentText = Array.from(segments)
      .map((segment) => segment.textContent?.trim() ?? "")
      .join("");
    const popover = container.querySelector('[data-slot="date-range-picker-popover"]');
    const grid = popover?.querySelector(".range-calendar__grid");
    const cells = popover?.querySelectorAll(".range-calendar__cell");

    expect(root?.className).toContain("date-range-picker");
    expect(trigger).toBeTruthy();
    expect(indicator).toBeTruthy();
    expect(separator?.textContent).toContain("-");
    expect(inputs.length).toBe(2);
    expect(segments.length).toBeGreaterThan(0);
    expect(segmentText.length).toBeGreaterThan(0);
    expect(grid).toBeTruthy();
    expect(cells?.length ?? 0).toBeGreaterThan(0);
  });
});
