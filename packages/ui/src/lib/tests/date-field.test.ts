import {render} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import {DateField} from "../components/date-field";

describe("date-field", () => {
  it("renders a default segmented input when no children are provided", () => {
    const {container} = render(DateField);

    const group = container.querySelector('[data-slot="date-input-group"]');
    const input = container.querySelector('[data-slot="date-input-group-input"]');
    const segments = container.querySelectorAll('[data-slot="date-input-group-segment"]');
    const segmentText = Array.from(segments)
      .map((segment) => segment.textContent?.trim() ?? "")
      .join("");

    expect(group?.className).toContain("date-input-group");
    expect(input).toBeTruthy();
    expect(segments.length).toBeGreaterThan(0);
    expect(segmentText.length).toBeGreaterThan(0);
  });
});
