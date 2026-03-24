import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import DisclosureHarness from "./fixtures/disclosure-harness.svelte";

describe("disclosure", () => {
  it("toggles standalone disclosures and coordinates disclosure groups", async () => {
    const onAlphaExpandedChange = vi.fn();
    const onBetaExpandedChange = vi.fn();
    const onBetaOpenChange = vi.fn();
    const onExpandedChange = vi.fn();
    const onGroupChange = vi.fn();

    const {container} = render(DisclosureHarness, {
      props: {
        onAlphaExpandedChange,
        onBetaExpandedChange,
        onBetaOpenChange,
        onExpandedChange,
        onGroupChange,
      },
    });

    const singleTrigger = screen.getByRole("button", {name: /single/i});
    const alphaTrigger = screen.getByRole("button", {name: /alpha/i});
    const betaTrigger = screen.getByRole("button", {name: /beta/i});
    const singleContent = screen
      .getByText("Single content")
      .closest('[data-slot="disclosure-content"]');
    const singleBody = screen.getByText("Single content").closest('[data-slot="disclosure-body"]');
    const alphaContent = screen
      .getByText("Alpha content")
      .closest('[data-slot="disclosure-content"]');
    const betaContent = screen
      .getByText("Beta content")
      .closest('[data-slot="disclosure-content"]');
    const indicators = container.querySelectorAll('[data-slot="disclosure-indicator"]');

    expect(singleTrigger.getAttribute("aria-expanded")).toBe("false");
    expect(alphaTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(alphaContent?.getAttribute("data-expanded")).toBe("true");
    expect(betaContent?.getAttribute("data-expanded")).toBeNull();
    expect(singleBody?.firstElementChild?.className).toContain("disclosure__body-inner");
    expect(singleBody?.firstElementChild?.className).toContain("single-body-inner");

    await fireEvent.click(singleTrigger);

    expect(onExpandedChange).toHaveBeenLastCalledWith(true);
    expect(singleTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(singleContent?.getAttribute("data-expanded")).toBe("true");
    expect(indicators[0]?.getAttribute("data-expanded")).toBe("true");

    await fireEvent.click(betaTrigger);

    const nextKeys = onGroupChange.mock.calls.at(-1)?.[0];

    expect(onBetaExpandedChange).toHaveBeenLastCalledWith(true);
    expect(onBetaOpenChange).toHaveBeenLastCalledWith(true);
    expect(nextKeys).toBeInstanceOf(Set);
    expect(Array.from(nextKeys ?? [])).toEqual(["beta"]);
    expect(alphaTrigger.getAttribute("aria-expanded")).toBe("false");
    expect(betaTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(alphaContent?.getAttribute("data-expanded")).toBeNull();
    expect(betaContent?.getAttribute("data-expanded")).toBe("true");

    await fireEvent.click(alphaTrigger);

    const finalKeys = onGroupChange.mock.calls.at(-1)?.[0];

    expect(onAlphaExpandedChange).toHaveBeenLastCalledWith(true);
    expect(finalKeys).toBeInstanceOf(Set);
    expect(Array.from(finalKeys ?? [])).toEqual(["alpha"]);
    expect(alphaTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(betaTrigger.getAttribute("aria-expanded")).toBe("false");
  });
});
