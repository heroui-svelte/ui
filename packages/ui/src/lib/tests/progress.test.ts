import {render} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import ProgressHarness from "./fixtures/progress-harness.svelte";

describe("progress family", () => {
  it("maps values onto outputs, fill widths, and circular stroke offsets", () => {
    const {container} = render(ProgressHarness);

    const meter = container.querySelector('[data-slot="meter"]');
    const meterOutput = container.querySelector('[data-slot="meter-output"]');
    const meterFill = container.querySelector('[data-slot="meter-fill"]');
    const progressBar = container.querySelectorAll('[data-slot="progress-bar"]')[0];
    const progressBarOutput = container.querySelectorAll('[data-slot="progress-bar-output"]')[0];
    const progressBarFill = container.querySelectorAll('[data-slot="progress-bar-fill"]')[0];
    const indeterminateProgressBar = container.querySelectorAll('[data-slot="progress-bar"]')[1];
    const indeterminateFill = container.querySelectorAll('[data-slot="progress-bar-fill"]')[1];
    const progressCircle = container.querySelector('[data-slot="progress-circle"]');
    const fillCircle = container.querySelector('[data-slot="progress-circle-fill-circle"]');

    expect(meter?.className).toContain("meter--success");
    expect(meterOutput?.textContent).toBe("40%");
    expect(meterFill?.getAttribute("style")).toContain("width: 40%");

    expect(progressBar?.className).toContain("progress-bar--warning");
    expect(progressBarOutput?.textContent).toBe("75%");
    expect(progressBarFill?.getAttribute("style")).toContain("width: 75%");
    expect(indeterminateProgressBar?.hasAttribute("aria-valuenow")).toBe(false);
    expect(indeterminateFill?.getAttribute("style") ?? "").not.toContain("width:");

    expect(progressCircle?.className).toContain("progress-circle--danger");
    expect(fillCircle?.getAttribute("stroke-dashoffset")).toBe("40.21238596594935");
  });
});
