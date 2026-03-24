import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import AccordionHarness from "./fixtures/accordion-harness.svelte";

describe("accordion", () => {
  it("maps expanded key state onto the Svelte implementation", async () => {
    const onExpandedChange = vi.fn();

    render(AccordionHarness, {
      props: {
        defaultExpandedKeys: ["payment"],
        onExpandedChange,
      },
    });

    const paymentTrigger = screen.getByRole("button", {name: /payment/i});
    const shippingTrigger = screen.getByRole("button", {name: /shipping/i});
    const paymentPanel = screen
      .getByText("Payment details")
      .closest('[data-slot="accordion-panel"]');
    const shippingPanel = screen
      .getByText("Shipping details")
      .closest('[data-slot="accordion-panel"]');

    expect(paymentTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(paymentPanel?.getAttribute("data-expanded")).toBe("true");
    expect(shippingPanel?.hasAttribute("hidden")).toBe(true);

    await fireEvent.click(shippingTrigger);

    const nextKeys = onExpandedChange.mock.calls.at(-1)?.[0];

    expect(nextKeys).toBeInstanceOf(Set);
    expect(Array.from(nextKeys ?? [])).toEqual(["shipping"]);
    expect(shippingTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(paymentTrigger.getAttribute("aria-expanded")).toBe("false");
    expect(paymentPanel?.hasAttribute("hidden")).toBe(true);
  });
});
