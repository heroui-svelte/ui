import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import DropdownHarness from "./fixtures/dropdown-harness.svelte";

describe("dropdown", () => {
  it("renders a Bits-backed dropdown menu and preserves checkbox-style selection", async () => {
    const {container} = render(DropdownHarness, {
      props: {
        open: true,
      },
    });

    const root = container.querySelector('[data-slot="dropdown"]');
    const trigger = screen.getByRole("button", {name: /open menu/i});
    const popover = container.querySelector('[data-slot="dropdown-popover"]');
    const menu = container.querySelector('[data-slot="dropdown-menu"]');
    const apple = screen.getByRole("menuitemcheckbox", {name: /apple/i});

    expect(root?.className).toContain("dropdown");
    expect(trigger).toBeTruthy();
    expect(popover).toBeTruthy();
    expect(menu).toBeTruthy();

    await fireEvent.click(apple);

    expect(apple.getAttribute("aria-checked")).toBe("true");
  });
});
