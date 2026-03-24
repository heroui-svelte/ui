import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import NumberFieldHarness from "./fixtures/number-field-harness.svelte";

describe("number-field", () => {
  it("wires label and descriptions, preserves slot hooks, and steps numeric values", async () => {
    const onChange = vi.fn();
    const onValueChange = vi.fn();
    const {container} = render(NumberFieldHarness, {
      props: {
        onChange,
        onValueChange,
      },
    });

    const root = container.querySelector('[data-slot="number-field"]');
    const group = container.querySelector('[data-slot="number-field-group"]');
    const input = (await screen.findByRole("spinbutton", {
      name: "Width",
    })) as HTMLInputElement;
    const description = screen.getByText("Enter the width in pixels.");
    const error = screen.getByText("Width must stay within range.");
    const decrementButton = screen.getByRole("button", {name: "Decrement value"});
    const incrementButton = screen.getByRole("button", {name: "Increment value"});
    const describedBy = input.getAttribute("aria-describedby") ?? "";

    expect(root?.className).toContain("number-field--full-width");
    expect(root?.className).toContain("number-field--secondary");
    expect(root?.getAttribute("data-invalid")).toBe("true");
    expect(group?.className).toContain("number-field__group--full-width");
    expect(input.value).toBe("12.5");
    expect(input.getAttribute("name")).toBe("width");
    expect(input.getAttribute("slot")).toBe(null);
    expect(input.getAttribute("aria-valuenow")).toBe("12.5");
    expect(describedBy).toContain(description.getAttribute("id") ?? "");
    expect(describedBy).toContain(error.getAttribute("id") ?? "");
    expect(decrementButton.getAttribute("slot")).toBe("decrement");
    expect(incrementButton.getAttribute("slot")).toBe("increment");
    expect(
      decrementButton.querySelector('[data-slot="number-field-decrement-button-icon"]'),
    ).toBeTruthy();
    expect(
      incrementButton.querySelector('[data-slot="number-field-increment-button-icon"]'),
    ).toBeTruthy();

    await fireEvent.click(incrementButton);

    expect(onValueChange).toHaveBeenLastCalledWith(13);
    expect(onChange).toHaveBeenLastCalledWith(13);
    expect(input.value).toBe("13");

    await fireEvent.click(decrementButton);

    expect(onValueChange).toHaveBeenLastCalledWith(12.5);
    expect(onChange).toHaveBeenLastCalledWith(12.5);
    expect(input.value).toBe("12.5");
  });

  it("keeps slot hooks when custom button children are provided", () => {
    const {container, queryByTestId} = render(NumberFieldHarness, {
      props: {
        customIcons: true,
      },
    });

    const decrementButton = container.querySelector('[data-slot="number-field-decrement-button"]');
    const incrementButton = container.querySelector('[data-slot="number-field-increment-button"]');

    expect(queryByTestId("custom-decrement")).toBeTruthy();
    expect(queryByTestId("custom-increment")).toBeTruthy();
    expect(
      decrementButton?.querySelector('[data-slot="number-field-decrement-button-icon"]'),
    ).toBeNull();
    expect(
      incrementButton?.querySelector('[data-slot="number-field-increment-button-icon"]'),
    ).toBeNull();
    expect(decrementButton?.getAttribute("slot")).toBe("decrement");
    expect(incrementButton?.getAttribute("slot")).toBe("increment");
  });

  it("disables the increment button at the max boundary", () => {
    render(NumberFieldHarness, {
      props: {
        defaultValue: 20,
      },
    });

    expect(screen.getByRole("button", {name: "Increment value"}).hasAttribute("disabled")).toBe(
      true,
    );
    expect(screen.getByRole("button", {name: "Decrement value"}).hasAttribute("disabled")).toBe(
      false,
    );
  });
});
