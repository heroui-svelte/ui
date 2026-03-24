import {render} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import {TimeField} from "../components/time-field";

import TimeFieldHarness from "./fixtures/time-field-harness.svelte";

describe("time-field", () => {
  it("renders a default segmented input when no children are provided", () => {
    const {container} = render(TimeField, {
      props: {
        name: "appointment-time",
      },
    });

    const group = container.querySelector('[data-slot="date-input-group"]');
    const input = container.querySelector('[data-slot="date-input-group-input"]');
    const segments = container.querySelectorAll('[data-slot="date-input-group-segment"]');
    const segmentText = Array.from(segments)
      .map((segment) => segment.textContent?.trim() ?? "")
      .join("");
    const hiddenInput = container.querySelector('input[name="appointment-time"]');

    expect(group?.className).toContain("date-input-group");
    expect(input).toBeTruthy();
    expect(segments.length).toBeGreaterThan(0);
    expect(segmentText.length).toBeGreaterThan(0);
    expect(hiddenInput).toBeTruthy();
  });

  it("supports the legacy group/input/prefix/suffix anatomy", () => {
    const {container, getByTestId} = render(TimeFieldHarness);

    const root = container.querySelector('[data-slot="time-field"]');
    const group = container.querySelector('[data-slot="date-input-group"]');
    const inputContainer = container.querySelector(
      '[data-slot="date-input-group-input-container"]',
    );
    const segments = container.querySelectorAll('[data-slot="date-input-group-segment"]');

    expect(root?.className).toContain("time-field--full-width");
    expect(group?.className).toContain("date-input-group--secondary");
    expect(group?.className).toContain("date-input-group--full-width");
    expect(inputContainer?.className).toContain("date-input-group__input-container");
    expect(getByTestId("time-prefix").textContent?.trim()).toBe("T");
    expect(getByTestId("time-suffix").textContent?.trim()).toBe("Z");
    expect(segments.length).toBeGreaterThan(0);
  });
});
