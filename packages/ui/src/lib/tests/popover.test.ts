import {fireEvent, render, screen} from "@testing-library/svelte";
import {describe, expect, it} from "vitest";

import PopoverHarness from "./fixtures/popover-harness.svelte";

describe("popover", () => {
  it("opens content from the trigger", async () => {
    render(PopoverHarness);

    expect(screen.queryByText("Popover content")).toBeNull();

    await fireEvent.click(screen.getByRole("button", {name: /open popover/i}));

    expect(await screen.findByText("Popover content")).toBeTruthy();
    expect(screen.getByText("Popover title")).toBeTruthy();
  });
});
