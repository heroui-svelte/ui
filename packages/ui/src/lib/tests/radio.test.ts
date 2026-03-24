import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import RadioHarness from "./fixtures/radio-harness.svelte";

describe("radio", () => {
  it("tracks group selection and preserves orientation and variant classes", async () => {
    const onChange = vi.fn();

    const {container} = render(RadioHarness, {
      props: {
        onChange,
      },
    });

    const radioGroup = screen.getByRole("radiogroup");
    const starterRadio = screen.getByRole("radio", {name: /starter/i});
    const proRadio = screen.getByRole("radio", {name: /pro/i});

    expect(radioGroup.className).toContain("radio-group--secondary");
    expect(radioGroup.getAttribute("data-orientation")).toBe("horizontal");
    expect(proRadio.getAttribute("data-selected")).toBe("true");
    expect(starterRadio.getAttribute("data-selected")).toBeNull();

    await fireEvent.click(starterRadio);

    expect(onChange).toHaveBeenLastCalledWith("starter");
    expect(starterRadio.getAttribute("data-selected")).toBe("true");
    expect(proRadio.getAttribute("data-selected")).toBeNull();
    expect(container.querySelector('[data-slot="radio-indicator"]')).toBeTruthy();
  });
});
