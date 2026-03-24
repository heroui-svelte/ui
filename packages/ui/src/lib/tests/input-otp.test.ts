import {fireEvent, render} from "@testing-library/svelte";
import {describe, expect, it, vi} from "vitest";

import InputOTPHarness from "./fixtures/input-otp-harness.svelte";

describe("input-otp", () => {
  it("renders indexed slots from the Bits pin-input cell state and syncs input changes", async () => {
    const onValueChange = vi.fn();
    const {container} = render(InputOTPHarness, {
      props: {
        onValueChange,
      },
    });

    const root = container.querySelector('[data-slot="input-otp"]');
    const separator = container.querySelector('[data-slot="input-otp-separator"]');
    const input = container.querySelector("input") as HTMLInputElement;
    const slots = [...container.querySelectorAll('[data-slot="input-otp-slot"]')];

    expect(root?.className).toContain("input-otp--secondary");
    expect(root?.getAttribute("data-invalid")).toBe("true");
    expect(separator?.textContent).toContain("/");
    expect(slots).toHaveLength(4);
    expect(slots[0]?.textContent).toContain("1");
    expect(slots[1]?.textContent).toContain("2");

    await fireEvent.input(input, {
      target: {
        value: "1234",
      },
    });

    expect(onValueChange).toHaveBeenLastCalledWith("1234");
    expect(slots[2]?.textContent).toContain("3");
    expect(slots[3]?.textContent).toContain("4");
  });
});
